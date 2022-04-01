import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Category } from '../category.entity';

export class UpdateCategoryDto extends Category {
  @IsNumber()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}
