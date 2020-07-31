import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
  async createListing(@Args('input') input: ListingInput): Promise<Listing> {
    return await this.listingService.create(input);
  }
}
