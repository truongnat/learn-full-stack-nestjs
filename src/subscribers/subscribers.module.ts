import { Module } from '@nestjs/common';
import SubscribersController from './subscribers.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [SubscribersController],
  providers: [
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.get('RABBITMQ_USER')}:${configService.get(
                'RABBITMQ_PASSWORD',
              )}@${configService.get('RABBITMQ_HOST')}`,
            ],
            queue: configService.get('RABBITMQ_QUEUE_NAME'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      inject: [ConfigService],
    },
  ],
})
export class SubscribersModule {}
