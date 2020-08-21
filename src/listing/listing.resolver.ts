import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { ListingService } from './listing.service';
import { Listing, ListingInput } from './listing.entity';

@Resolver('Listing')
export class ListingResolver {
  constructor(private readonly listingService: ListingService) {}

  @Query(() => [Listing])
  async listings(): Promise<Listing[]> {
    return await this.listingService.findAll();
  }

  @Query(() => Listing)
  async listing(@Args('id') id: string): Promise<Listing> {
    return await this.listingService.findById(id);
  }

  @Mutation(() => Listing)
  async createListing(
    @Args('input') input: ListingInput,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: FileUpload,
  ): Promise<Listing> {
    return await this.listingService.create(input, image);
  }
}
