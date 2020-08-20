import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingModule } from './listing/listing.module';
import { join } from 'path';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      uploads: true,
    }),
    TypeOrmModule.forRoot(),
    ListingModule,
    ImageModule,
  ],
  providers: [],
})
export class AppModule {}
