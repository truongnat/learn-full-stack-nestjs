import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { PublicFile } from './publicFile.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(id: string) {
    const file = await this.publicFilesRepository.findOne({ where: { id } });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(id);
  }

  async deletePublicFileWithQueryRunner(id: string, queryRunner: QueryRunner) {
    const file = await queryRunner.manager.findOne(PublicFile, {
      where: { id },
    });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await queryRunner.manager.delete(PublicFile, id);
  }
}
