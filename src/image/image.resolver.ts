import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { ImageService } from './image.service';
import { Image } from './image.entity';

@Resolver('Image')
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Query(() => [Image])
  async images(): Promise<Image[]> {
    return await this.imageService.findAll();
  }

  @Query(() => Image)
  async image(@Args('id') id: string): Promise<Image> {
    return await this.imageService.findById(id);
  }

  @Mutation(() => Image)
  async createImage(
    @Args({ name: 'image', type: () => GraphQLUpload }) upload: FileUpload,
  ): Promise<Image> {
    return await this.imageService.create(upload);
  }
}
