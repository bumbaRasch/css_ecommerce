import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { Customer } from '../../../../libs/shared/src/entities/customer.entity';
import { Product } from '../../../../libs/shared/src/entities/product.entity';

describe('CustomersService', () => {
  let service: CustomersService;
  let customersClient: { send: jest.Mock };
  let productsClient: { send: jest.Mock };
  let configService: { get: jest.Mock };

  beforeEach(async () => {
    customersClient = { send: jest.fn() };
    productsClient = { send: jest.fn() };
    configService = { get: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: 'CUSTOMERS_SERVICE', useValue: customersClient },
        { provide: 'PRODUCTS_SERVICE', useValue: productsClient },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should return all customers', async () => {
    const result: Customer[] = [
      {
        id: 1,
        name: 'John',
        email: 'john@mail.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    customersClient.send.mockReturnValue(of(result));

    const customers = await service.getAllCustomers();
    expect(customers).toEqual(result);
    expect(customersClient.send).toHaveBeenCalledWith('findAllCustomer', {});
  });

  it('should return a customer with favorite products', async () => {
    const customer: Customer = {
      id: 1,
      name: 'Jane',
      email: 'jane@mail.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const favorites: Product[] = [
      {
        id: 10,
        name: 'Product A',
        description: 'Test product',
        price: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    customersClient.send.mockReturnValueOnce(of(customer));
    productsClient.send.mockReturnValueOnce(of(favorites));
    configService.get.mockReturnValue('1');

    const result = await service.getCustomerWithFavorites(1);
    expect(result).toEqual({ ...customer, favorites });
    expect(customersClient.send).toHaveBeenCalledWith('findOneCustomer', 1);
    expect(productsClient.send).toHaveBeenCalledWith('getRandomProducts', 1);
  });

  it('should return null if customer not found', async () => {
    customersClient.send.mockReturnValue(of(null));

    const result = await service.getCustomerWithFavorites(99);
    expect(result).toBeNull();
  });
});
