import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateTagDto } from "../tags-dtos/create-tag.dto";
import { Tag } from "../tags-entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.tagRepository.find();
  }

  async findMultipleTags(ids: number[]) {
    try {
      return await this.tagRepository.findBy({ id: In(ids) });
    } catch (error) {
      console.error(">>> Error find multiple tags service", error);
      throw new RequestTimeoutException(
        "Unable to process request at the moment, please try later",
        { description: "Database connection error" },
      );
    }
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
