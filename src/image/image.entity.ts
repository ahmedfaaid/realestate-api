import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  filename: string;

  @Column()
  @Field()
  mimetype: string;

  @Column()
  @Field()
  path: string;

  @CreateDateColumn({ name: 'createdAt' })
  @Field()
  createdAt: string;
}
