import { Body, Controller, Post } from '@nestjs/common';
import { AdministrativeService } from './administrative.service';
import { CreateUserDto } from './dto/create-administrative.dto';

@Controller('administrative')
export class AdministrativeController {
  constructor(private readonly administrativeService: AdministrativeService) {}

  @Post('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.administrativeService.create(createUserDto);
  }
}
