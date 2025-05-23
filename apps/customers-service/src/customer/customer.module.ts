import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
