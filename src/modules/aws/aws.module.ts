// src/aws/aws.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsS3Controller } from './aws.controller';
import { AwsS3Service } from './aws.service';

@Module({
  imports: [ConfigModule],
  controllers: [AwsS3Controller],
  providers: [AwsS3Service],
  exports: [AwsS3Service],
})
export class AwsModule {}
