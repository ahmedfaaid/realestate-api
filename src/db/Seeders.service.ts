import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import Listr from 'listr';

import { Listing, ListingInput } from '../listing/listing.entity';
import { ListingService } from '../listing/listing.service';

interface CTX {
  listings: Listing[];
  input: ListingInput;
}

@Injectable()
export class SeederService {
  constructor(
    @Inject('Connection') public connection: Connection,
    public listingService: ListingService
  ) {}

  

  async getRepository<T>(entity: string): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }

  async seedListings(input: ListingInput): Promise<Listing[]> {
    const newListings = [
      {
        title: 'Great place, great location',
        address1: '500 Kingston Rd',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M4L 1V3',
        description: 'You will love it',
        longitude: -79.302742,
        latitude: 43.678001,
      },
      {
        title: 'You will love it',
        address1: '26 Goodwood Park Cres',
        city: 'East York',
        province: 'ON',
        postalCode: 'M4C 2G5',
        description: 'Great location, nice unit',
        longitude: -79.299187,
        latitude: 43.695019,
      },
      {
        title: 'Close to amenities',
        address1: '717 Broadview Ave',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M4K 2P5',
        description: 'Very close to downtown and the Danforth',
        longitude: -79.357468,
        latitude: 43.675171,
      }
    ];

    return Promise.all(newListings.map(async listing => {
      return await this.listingService.create(input(listing));
    }));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async seedAll() {
    await new Listr([
      {
        title: 'Reset DB',
        task: async () => {
          await this.connection.dropDatabase();
          await this.connection.synchronize(true);
        },
      },
      {
        title: 'Create listings',
        task: async (ctx: CTX) => {
          ctx.listings = await this.seedListings(ctx.input);
        }
      }
    ]).run();
  }
}