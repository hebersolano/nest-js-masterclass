import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { MetaOption } from "../meta-option.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMetaOptionDto } from "../meta-options-dtos/meta-options.dto";

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  async findOne(id: number) {
    console.log(">>> service create meta opts id", id);
    const metaOption = await this.metaOptionRepository.findOneBy({ id });

    if (!metaOption?.metaValue) return;
    return {
      ...metaOption,
      metaValue: JSON.parse(metaOption?.metaValue || "{}") as JSON,
    };
  }

  async create(createMetaOptionsDto: CreateMetaOptionDto) {
    let newMetaOption = this.metaOptionRepository.create(createMetaOptionsDto);
    console.log(">>> meta option empty instance", newMetaOption);
    newMetaOption = await this.metaOptionRepository.save(newMetaOption);
    return newMetaOption;
  }

  async delete(id: number) {
    return await this.metaOptionRepository.delete(id);
  }
}
