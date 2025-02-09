import { Injectable } from '@nestjs/common';
import { StocksRepository } from 'src/shared/database/repositories/stock.repositories';

@Injectable()
export class StockService {
  constructor(private readonly stocksRepository: StocksRepository) {}

  async findAll(adegaId: string) {
    try {
      const stockProduct = await this.stocksRepository.findMany(adegaId);
      return { stockProduct };
    } catch (e) {
      console.log(e);
    }
  }

  //Cada

  async findLowStock(adegaId: string) {
    try {
      const stockProduct = await this.stocksRepository.findMany(adegaId);
      const lowStockProducts = stockProduct
        .filter((stock) => {
          console.log(
            `Checking stock: Quantity=${stock.quantity}, LowStock=${stock.lowStock}`,
          );
          return Number(stock.quantity) <= Number(stock.lowStock);
        })
        .map((stock) => ({
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

      console.log(lowStockProducts);
      return lowStockProducts;
    } catch (error) {
      console.error('Erro ao buscar estoques baixos:', error);
      throw new Error('Não foi possível buscar os estoques baixos.');
    }
  }
}
