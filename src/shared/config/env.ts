import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  jwtScret: string;
  BUCKET_NAME: string;
  AWS_REGION: string;
  FRONT_URL: string;
}

export const env: Env = plainToInstance(Env, {
  jwtScret: process.env.JWT_SECRET,
  bucketName: process.env.BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  frontUrl: process.env.FRONT_URL!,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
