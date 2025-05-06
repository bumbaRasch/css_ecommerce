import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Customer } from '../../../../libs/shared/src/entities/customer.entity';
import { Product } from '../../../../libs/shared/src/entities/product.entity';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMERS_SERVICE') private readonly customersClient: ClientProxy,
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async getAllCustomers(): Promise<Customer[]> {
    return firstValueFrom(this.customersClient.send('findAllCustomer', {}));
  }

  async getCustomerWithFavorites(id: number): Promise<Customer | null> {
    const customer = await firstValueFrom<Customer>(
      this.customersClient.send('findOneCustomer', id),
    );
    if (!customer) return null;
    const count =
      Number(this.configService.get('FAVORITE_PRODUCTS_COUNT')) || 3;
    const favorites: Product[] = await firstValueFrom(
      this.productsClient.send('getRandomProducts', count),
    );
    return { ...customer, favorites };
  }
}
