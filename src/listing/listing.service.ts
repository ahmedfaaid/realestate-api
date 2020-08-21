import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing, ListingInput } from './listing.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { FileUpload } from 'graphql-upload';
import { processUpload } from '../utils/createUpload';
import { Image } from 'src/image/image.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
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

  async create(input: ListingInput, image: FileUpload): Promise<Listing> {
    const newImage = await processUpload(image);

    if (!newImage)
      throw new NotAcceptableException('There was an issue with the file');

    await this.imageRepository.save(newImage);

    const listing = await this.listingRepository.create(input);
    listing.id = uuid();
    listing.image = newImage.id;

    return await this.listingRepository.save(listing);
  }
}
