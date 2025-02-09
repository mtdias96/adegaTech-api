import { HttpException, HttpStatus } from '@nestjs/common';

export function CatchDbErrors() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error.code === '23505') {
          throw new HttpException('Duplicate entry', HttpStatus.CONFLICT);
        }
        throw error;
      }
    };

    return descriptor;
  };
}
