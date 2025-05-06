import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('ProductsMain');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
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
  logger.log('🚀 Products microservice is starting...');
  await app.listen();
  logger.log('✅ Products microservice is listening on Redis');
}
void bootstrap();
