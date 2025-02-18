// /* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}

  async findAll(paginationDTO: PaginationDTO) {
    return this.propertyRepo.find({
      skip: paginationDTO.skip,
      take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({
      where: { id },
    });

    if (!property) throw new NotFoundException('Property not found');

    return property;
  }

  async create(dto: CreatePropertyDto) {
    return this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    return this.propertyRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return this.propertyRepo.delete({ id });
  }
}
