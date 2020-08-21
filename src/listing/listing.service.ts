import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing, ListingInput } from './listing.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  async findAll(): Promise<Listing[]> {
    return await this.listingRepository.find({ relations: ['image'] });
  }

  async findById(id: string): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['image'],
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }

  async create(input: ListingInput): Promise<Listing> {
    const listing = await this.listingRepository.create(input);
    listing.id = uuid();

    return await this.listingRepository.save(listing);
  }
}
