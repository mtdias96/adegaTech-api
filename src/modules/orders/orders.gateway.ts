import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class OrdersGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Orders Gateway Initialized');
  }

  //Método para notificar um novo pedido
  notifyNewOrder(order: any) {
    this.server.emit('newOrder', order);
  }

  notifyStockUpdate(stockData: any) {
    this.server.emit('stockUpdate', stockData);
  }

  //Implementar atualização de caixa
}
