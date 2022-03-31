import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Post } from '../entities/post.entity';

export class UpdatePostDto extends Post {
  @IsNumber()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
