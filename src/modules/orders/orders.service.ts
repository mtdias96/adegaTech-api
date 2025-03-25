import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import { FinancialRepository } from 'src/shared/database/repositories/financial.repositories';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repositories';
import { StocksRepository } from 'src/shared/database/repositories/stock.repositories';
import { Payment } from 'src/utils/Payment';
import { ItemsDto } from './dto/create-order.dto';
import { OrdersGateway } from './orders.gateway';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly stockRepository: StocksRepository,
    private readonly prismaService: PrismaService,
    private readonly ordersGateway: OrdersGateway,
    private readonly financialRepository: FinancialRepository,
  ) {}

  //Adicionar campo de paymnet
  async create(createOrderDto: ItemsDto, adegaId: string, userId: string) {
    const { items } = createOrderDto;
    const productIds = items.map((item) => item.productId);
    const dateWithTime = new Date().toISOString();
    const stockData = { updatedStock: items, adegaId };

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
        const { name } = await this.ordersRepository.findName(item.productId);

        throw new BadRequestException(
          `Estoque insuficiente para o produto: ${name} | Stock atual: ${stockAvailable} `,
        );
      }
    }

    const totalPrice = items.reduce((total, item) => {
      const price = pricePerProduct.get(item.productId);
      return total + price * item.quantity;
    }, 0);

    const totalSaleOrder = items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    console.log(totalSaleOrder);

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
          const order = await this.ordersRepository.createOrder(orderData, trx);

          const { success, status } = await Payment();

          if (!success) {
            await this.ordersRepository.updateOrder(order.id, status, trx);
            throw new BadRequestException(
              'Erro ao efetuar pagamento pagamento',
            );
          }

          await this.ordersRepository.updateOrder(order.id, status, trx);
          await this.stockRepository.updateStockAfterSale(items, trx);
          await this.ordersRepository.updateAllSales(
            adegaId,
            totalSaleOrder,
            trx,
          );
          await this.financialRepository.createFinancialTransition(
            {
              date: dateWithTime,
              totalSales: totalPrice,
              adega: {
                connect: { id: adegaId },
              },
            },
            trx,
          );

          this.ordersGateway.notifyNewOrder(order);
          this.ordersGateway.notifyStockUpdate(stockData);

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

  async findAll(adegaId: string) {
    const data = await this.ordersRepository.findAllOrders(adegaId);

    return { data };
  }
}
