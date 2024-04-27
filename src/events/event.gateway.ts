import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, 'connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() data: any) {
    console.log(data);

    this.server.emit('onMessage', {
      message: 'new message',
      content: data,
    });
  }
}
