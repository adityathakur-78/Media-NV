import { Controller, Post, Body } from '@nestjs/common';
import { ChatGateway } from '../chat/chat.gateway';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly chatGateway: ChatGateway) {}

  @Post('test')
  handleWebhook(@Body() body: any) {
    const msg = body.message || 'Webhook triggered';

    this.chatGateway.sendWebhookMessage('room-1', `${msg}`);

    return { success: true };
  }
}
