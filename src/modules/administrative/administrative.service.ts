import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-administrative.dto';

import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

@Injectable()
export class AdministrativeService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { adega, email, name, password } = createUserDto;

    const existingRecord = await this.usersRepository.findFirst(
      email,
      adega.name,
    );

    if (existingRecord) {
      throw new BadRequestException('Adega name already exists');
    }

    const hashedPassword = await hash(password, 12);

    const userWithAdega = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
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

    const acessToken = await this.jwtService.signAsync({
      sub: userWithAdega.id,
      adega: userWithAdega.adegaId,
    });

    return { acessToken };
  }

  async getUserById(id: string) {
    return this.usersRepository.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        adegaId: true,
      },
    });
  }
}
