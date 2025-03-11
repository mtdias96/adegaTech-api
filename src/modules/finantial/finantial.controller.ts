import { Controller, Get } from '@nestjs/common';
import { ActiveAdegaId } from 'src/shared/decorator/ActiveAdegaId';
import { FinantialService } from './finantial.service';

@Controller('finantial')
export class FinantialController {
  constructor(private readonly finantialService: FinantialService) {}

  @Get('total')
  findAll(@ActiveAdegaId() adegaId: string) {
    return this.finantialService.findAll(adegaId);
  }
}
