import { Module } from '@nestjs/common';
import { CustomersServiceController } from './customers-service.controller';
import { CustomersServiceService } from './customers-service.service';

@Module({
  imports: [],
  controllers: [CustomersServiceController],
  providers: [CustomersServiceService],
})
export class CustomersServiceModule {}
