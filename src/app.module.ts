import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ListingModule } from './listing/listing.module';
import { ImageModule } from './image/image.module';
import { GraphQLWithUploadModule } from './graphql-with-upload.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLWithUploadModule.forRoot(),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['dist/**/*.entity{.ts,.js}'],
            ssl: true,
          }
        : {},
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/graphql'],
    }),
    ListingModule,
    ImageModule,
  ],
  providers: [],
})
export class AppModule {}
