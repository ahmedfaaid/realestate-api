import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingResolver } from './listing.resolver';
import { ListingService } from './listing.service';
import { Listing } from './listing.entity';
import { Image } from '../image/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Image])],
  providers: [ListingResolver, ListingService, Image],
})
export class ListingModule {}
