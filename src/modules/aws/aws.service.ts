// src/aws/services/aws-s3.service.ts
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class AwsS3Service {
  constructor(private readonly userRepository: UsersRepository) {}

  async generateFileUrl(
    adegaId: string,
    fileName: string,
    expiresIn = 10000,
  ): Promise<{
    fileUrl: string;
    imageKey: string;
    expiresIn: string;
  }> {
    const { name: adegaName } =
      await this.userRepository.findAdegaName(adegaId);

    if (!adegaName) {
      throw new BadRequestException('Adega não encontrada!');
    }

    const key = `uploads/adegas/${adegaName}/produtos/${fileName}${randomUUID()}`;

    const s3Client = new S3Client({
      region: 'sa-east-1',
    });

    const command = new PutObjectCommand({
      Bucket: 'adega-tech',
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    return {
      fileUrl: presignedUrl,
      imageKey: key,
      expiresIn: `${expiresIn} segundos`,
    };
  }

  // async checkFileExists(
  //   storeId: string,
  //   fileName: string,
  // ): Promise<{
  //   exists: boolean;
  //   key: string;
  // }> {
  //   const key = `stores/${storeId}/products/${fileName}`;

  //   const command = new HeadObjectCommand({
  //     Bucket: this.bucketName,
  //     Key: key,
  //   });

  //   try {
  //     await this.s3Client.send(command);
  //     return { exists: true, key };
  //   } catch (error: any) {
  //     if (error.name === 'NotFound') {
  //       return { exists: false, key };
  //     }
  //     throw error;
  //   }
  // }
}
