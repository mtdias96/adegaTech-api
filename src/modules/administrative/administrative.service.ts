import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-administrative.dto';

import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class AdministrativeService {
  constructor(private readonly UsersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { adega, email, name, password, role } = createUserDto;

    const existingRecord = await this.UsersRepository.findFirst(
      email,
      adega.name,
    );

    if (existingRecord) {
      throw new BadRequestException('Adega name already exists');
    }

    const hashedPassword = await hash(password, 12);

    const userWithAdega = await this.UsersRepository.create({
      email,
      name,
      password: hashedPassword,
      role,
      adega: {
        create: {
          name: adega.name,
          city: adega.city,
          neighborhood: adega.neighborhood,
          zipCode: adega.zipCode,
          state: adega.state,
          phone: adega.phone,
        },
      },
    });

    return userWithAdega;
  }
}
