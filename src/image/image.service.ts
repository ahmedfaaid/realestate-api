import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUpload } from 'graphql-upload';
import { Image } from './image.entity';
import { cloudinaryUpload } from '../utils/createUpload';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find();
  }

  async findById(id: string): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: { id },
    });
    if (!image) throw new NotFoundException('Image not found');
    return image;
  }

  async create(upload: FileUpload): Promise<Image> {
    const image = await cloudinaryUpload(upload);

    if (!image)
      throw new NotAcceptableException('There was an issue with the file');

    return await this.imageRepository.save(image);
  }
}
