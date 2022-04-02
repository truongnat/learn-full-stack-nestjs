import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FilesModule } from 'src/files/files.module';
import { PrivateFilesModule } from 'src/files/privateFiles.module';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), FilesModule, PrivateFilesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
