import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from '../tags-entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../tags-dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.tagRepository.find();
  }

  async findMultipleTags(tags: number[]) {
    return await this.tagRepository.findBy({ id: In(tags) });
  }

  async create(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(newTag);
  }

  async delete(id: number) {
    await this.tagRepository.delete(id);
  }

  async softDelete(id: number) {
    await this.tagRepository.softDelete(id);
  }
}
