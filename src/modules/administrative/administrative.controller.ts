import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorator/ActiveUserId';
import { IsPublic } from 'src/shared/decorator/IsPublic';
import { AdministrativeService } from './administrative.service';
import { CreateUserDto } from './dto/create-administrative.dto';

@Controller('administrative')
export class AdministrativeController {
  constructor(private readonly administrativeService: AdministrativeService) {}

  @Post('users')
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.administrativeService.create(createUserDto);
  }

  @Get('/users/me')
  me(@ActiveUserId() userId: string) {
    return this.administrativeService.getUserById(userId);
  }
}
