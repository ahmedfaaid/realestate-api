import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  address1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address2?: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  province: string;

  @Column()
  @Field()
  postalCode: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  desposition: string;

  @Column()
  @Field()
  price: number;

  @Column('float')
  @Field()
  longitude: number;

  @Column('float')
  @Field()
  latitude: number;

  @CreateDateColumn({ name: 'createdAt' })
  @Field()
  createdAt: string;
}

@InputType()
export class ListingInput {
  @Field()
  title: string;

  @Field()
  address1: string;

  @Field({ nullable: true })
  address2?: string;

  @Field()
  city: string;

  @Field()
  province: string;

  @Field()
  postalCode: string;

  @Field()
  description: string;

  @Field()
  desposition: string;

  @Field()
  price: number;

  @Field()
  longitude: number;

  @Field()
  latitude: number;
}
