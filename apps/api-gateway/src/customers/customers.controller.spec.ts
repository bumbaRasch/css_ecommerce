import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { NotFoundException } from '@nestjs/common';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: {
    getAllCustomers: jest.Mock;
    getCustomerWithFavorites: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      getAllCustomers: jest.fn(),
      getCustomerWithFavorites: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomersService, useValue: service }],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should return all customers', async () => {
    const customers = [{ id: 1, name: 'John', email: 'john@mail.com' }];
    service.getAllCustomers.mockResolvedValue(customers);

    const result = await controller.getAll();
    expect(result).toEqual(customers);
    expect(service.getAllCustomers).toHaveBeenCalled();
  });

  it('should return customer with favorites', async () => {
    const customer = {
      id: 1,
      name: 'Jane',
      email: 'jane@mail.com',
      favorites: [{ id: 2, name: 'Product A' }],
    };
    service.getCustomerWithFavorites.mockResolvedValue(customer);

    const result = await controller.getCustomerWithFavorites('1');
    expect(result).toEqual(customer);
    expect(service.getCustomerWithFavorites).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if customer not found', async () => {
    service.getCustomerWithFavorites.mockResolvedValue(null);

    await expect(controller.getCustomerWithFavorites('999')).rejects.toThrow(
      NotFoundException,
    );
  });
});
