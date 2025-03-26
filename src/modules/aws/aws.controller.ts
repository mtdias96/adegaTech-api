// src/aws/controllers/aws-s3.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { ActiveAdegaId } from '../../shared/decorator/ActiveAdegaId';
import { AwsS3Service } from './aws.service';

@Controller('aws')
export class AwsS3Controller {
  private readonly logger = new Logger(AwsS3Controller.name);

  constructor(private readonly awsS3Service: AwsS3Service) {}

  @Post('get-presigned-url')
  async getFileUrl(
    @Body('fileName') fileName: string,
    @Query('expiresIn') expiresIn: string = '60',
    @ActiveAdegaId() adegaId: string,
  ) {
    try {
      const expiresInSeconds = parseInt(expiresIn, 10);

      return await this.awsS3Service.generateFileUrl(
        adegaId,
        fileName,
        expiresInSeconds,
      );
    } catch (error) {
      this.logger.error(
        `Error generating file URL: ${error.message}`,
        error.stack,
      );
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao gerar URL do arquivo');
    }
  }
}
