import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // when user joins a room
  @SubscribeMessage('join_room')
  handleJoinRoom(
    client: Socket,
    payload: { roomId: string; username: string },
  ) {
    client.join(payload.roomId);

    client.data.username = payload.username;

    console.log(`${payload.username} joined room ${payload.roomId}`);
  }

  // when user sends message
  @SubscribeMessage('send_message')
  handleMessage(client: Socket, payload: { roomId: string; message: string }) {
    const username = client.data.username;

    this.server.to(payload.roomId).emit('receive_message', {
      username,
      message: payload.message,
    });
  }

  sendWebhookMessage(roomId: string, message: string) {
    this.server.to(roomId).emit('receive_message', {
      username: 'WEBHOOK',
      message,
    });
  }
}
