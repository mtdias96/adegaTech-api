import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '../../shared/decorator/IsPublic';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  authenticate(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
