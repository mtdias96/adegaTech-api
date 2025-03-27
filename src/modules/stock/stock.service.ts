import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  StocksRepository,
  StockWithProduct,
} from '../../shared/database/repositories/stock.repositories';

@Injectable()
export class StockService {
  constructor(private readonly stocksRepository: StocksRepository) {}

  async findAll(adegaId: string) {
    try {
      const stockProduct = await this.stocksRepository.findMany(adegaId);
      return { stockProduct };
    } catch {
      throw new NotFoundException();
    }
  }

  async findLowStock(adegaId: string) {
    try {
      const stockProduct = await this.stocksRepository.findMany(adegaId);
      const lowStockProducts = stockProduct
        .filter((stock) => {
          return Number(stock.quantity) <= Number(stock.lowStock);
        })
        .map((stock: StockWithProduct) => ({
          stockId: stock.id,
          productId: stock.product.id,
          name: stock.product.name,
          description: stock.product.description,
          price: stock.product.price,
          imageUrl: stock.product.imageUrl,
          quantity: stock.quantity,
          lowStock: stock.lowStock,
          updatedAt: stock.updatedAt,
          adegaId: stock.adegaId,
        }));

      return lowStockProducts;
    } catch {
      throw new BadRequestException(
        'Não foi possível buscar os estoques baixos.',
      );
    }
  }
}
