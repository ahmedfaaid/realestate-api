import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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

  @Column('float')
  @Field()
  longitude: number;

  @Column('float')
  @Field()
  latitude: number;
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
  longitude: number;

  @Field()
  latitude: number;
}
