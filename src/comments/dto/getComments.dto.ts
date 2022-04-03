import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCommentsDto {
  @Type(() => String)
  @IsOptional()
  postId?: string;
}
