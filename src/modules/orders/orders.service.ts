import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repositories';
import { StocksRepository } from 'src/shared/database/repositories/stock.repositories';
import { Payment } from 'src/utils/Payment';
import { ItemsDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly stockRepository: StocksRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createOrderDto: ItemsDto, adegaId: string, userId: string) {
    const { items } = createOrderDto;
    const productIds = items.map((item) => item.productId);

    const productStockData = await this.ordersRepository.findStockByProducts(
      adegaId,
      productIds,
    );

    if (!productStockData || productStockData.length === 0) {
      throw new NotFoundException('Produto não encontrado');
    }

    const stockByProduct = new Map(
      productStockData.map((p) => [p.productId, p.quantity]),
    );
    const pricePerProduct = new Map(
      productStockData.map((p) => [p.productId, p.product.price]),
    );

    for (const item of items) {
      const stockAvailable = stockByProduct.get(item.productId) || 0;
      if (stockAvailable < item.quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto ID ${item.productId}`,
        );
      }
    }

    const totalPrice = items.reduce((total, item) => {
      const price = pricePerProduct.get(item.productId);
      return total + price * item.quantity;
    }, 0);

    const orderData = {
      total: totalPrice,
      user: {
        connect: { id: userId },
      },
      adega: {
        connect: { id: adegaId },
      },
      items: {
        create: items.map((item) => ({
          quantity: item.quantity,
          price: pricePerProduct.get(item.productId),
          product: {
            connect: { id: item.productId },
          },
        })),
      },
    };

    try {
      await this.prismaService.$transaction(
        async (trx: PrismaClient) => {
          const { id } = await this.ordersRepository.createOrder(
            orderData,
            trx,
          );

          const { success, status } = await Payment();

          if (!success) {
            await this.ordersRepository.updateOrder(id, status, trx);
            throw new BadRequestException(
              'Erro ao efetuar pagamento pagamento',
            );
          }

          await this.ordersRepository.updateOrder(id, status, trx);
          await this.stockRepository.updateStockAfterSale(items, trx);

          return { message: 'Pagamento efetuado com sucesso' };
        },
        {
          maxWait: 30000,
          timeout: 40000,
        },
      );
    } catch {
      throw new BadRequestException('Erro ao criar pedido');
    }
  }
}
