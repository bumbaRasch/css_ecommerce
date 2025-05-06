import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { DatabaseService } from '../../db/db.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let db: { customer: { findMany: jest.Mock; findUnique: jest.Mock } };

  beforeEach(async () => {
    db = {
      customer: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, { provide: DatabaseService, useValue: db }],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should return all customers', async () => {
    const customers = [{ id: 1, name: 'Test', email: 'test@mail.com' }];
    db.customer.findMany.mockResolvedValue(customers);

    expect(await service.findAll()).toEqual(customers);
    expect(db.customer.findMany).toHaveBeenCalled();
  });

  it('should return one customer by id', async () => {
    const customer = { id: 1, name: 'Test', email: 'test@mail.com' };
    db.customer.findUnique.mockResolvedValue(customer);

    expect(await service.findOne(1)).toEqual(customer);
    expect(db.customer.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
