import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';

import { WebhooksModule } from './webhooks/webhooks.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [WebhooksModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
