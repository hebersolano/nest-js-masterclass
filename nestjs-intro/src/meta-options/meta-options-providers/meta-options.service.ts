import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptionsDto } from '../meta-options-dtos/meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  async findOne(id: number) {
    console.log('>>> service create meta opts id', id);
    return await this.metaOptionRepository.findOneBy({ id });
  }

  async create(metaOptionsDto: MetaOptionsDto) {
    let newMetaOption = this.metaOptionRepository.create();
    console.log('>>> meta option empty instance', newMetaOption);
    newMetaOption.metaValue = metaOptionsDto.metaValue;
    newMetaOption = await this.metaOptionRepository.save(newMetaOption);
    return newMetaOption;
  }
}
