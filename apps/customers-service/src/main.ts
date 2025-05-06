import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer/customer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('CustomersMain');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomerModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
      },
      logger: ['log', 'error', 'warn', 'debug'],
    },
  );

  logger.log('🚀 Customers microservice is starting...');
  await app.listen();
  logger.log('✅ Customers microservice is listening on Redis');
}
void bootstrap();
