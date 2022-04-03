import { IsString } from 'class-validator';

export class ObjectWithIdDto {
  @IsString()
  id: string;
}
