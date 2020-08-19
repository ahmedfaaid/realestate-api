import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingModule } from './listing/listing.module';
import { join } from 'path';
import { ImageResolver } from './image/image.resolver';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(),
    ListingModule,
    ImageModule,
  ],
  providers: [ImageResolver, ImageService],
})
export class AppModule {}
