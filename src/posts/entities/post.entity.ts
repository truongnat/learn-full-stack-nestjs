import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;
}
