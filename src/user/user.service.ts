import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    const user = this.userRepo.findOne({
      where: { id },
      select: ['firstName', 'lastName', 'avatarUrl'],
    });

    return user;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
