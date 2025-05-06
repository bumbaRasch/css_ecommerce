import { NestFactory } from '@nestjs/core';
import { CustomersServiceModule } from './customers-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomersServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
