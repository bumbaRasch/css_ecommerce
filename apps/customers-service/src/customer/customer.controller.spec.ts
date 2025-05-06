import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: { findAll: jest.Mock; findOne: jest.Mock };

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{ provide: CustomerService, useValue: service }],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should return all customers', async () => {
    const customers = [{ id: 1, name: 'Test', email: 'test@mail.com' }];
    service.findAll.mockResolvedValue(customers);

    expect(await controller.findAll()).toEqual(customers);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one customer by id', async () => {
    const customer = { id: 1, name: 'Test', email: 'test@mail.com' };
    service.findOne.mockResolvedValue(customer);

    expect(await controller.findOne(1)).toEqual(customer);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
