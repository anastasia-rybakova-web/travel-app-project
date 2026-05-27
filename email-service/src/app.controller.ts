import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_registered') 
  async handleUserRegistered(@Payload() data: { email: string; username: string; role: string }) {
    console.log('[RabbitMQ] Получено событие регистрации пользователя:', data);
    await this.appService.sendWelcomeEmail(data);
  }
}
