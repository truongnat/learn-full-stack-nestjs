import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { PrivateFile } from './privateFile.entity';
import { PublicFile } from './publicFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile, PrivateFile])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
