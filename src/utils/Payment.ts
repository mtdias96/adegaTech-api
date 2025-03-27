import { OrderStatus } from '@prisma/client';
import { randomUUID, UUID } from 'crypto';

export const Payment = (): Promise<{
  success: boolean;
  transactionId: UUID;
  status: OrderStatus;
}> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          success: true,
          transactionId: randomUUID(),
          status: OrderStatus.COMPLETED,
        }),
      1,
    );
  });
};

export const PaymentError = (): Promise<{
  success: boolean;
  transactionId: UUID;
  status: OrderStatus;
}> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          success: false,
          transactionId: randomUUID(),
          status: OrderStatus.CANCELLED,
        }),
      1000,
    );
  });
};
