import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { DatabaseService } from '../../db/db.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let db: {
    product: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
    };
    $queryRaw: jest.Mock;
  };

  beforeEach(async () => {
    db = {
      product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
      $queryRaw: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, { provide: DatabaseService, useValue: db }],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should return all products', async () => {
    const products = [{ id: 1, name: 'Product A' }];
    db.product.findMany.mockResolvedValue(products);

    expect(await service.findAll()).toEqual(products);
    expect(db.product.findMany).toHaveBeenCalled();
  });

  it('should return one product by id', async () => {
    const product = { id: 1, name: 'Product A' };
    db.product.findUnique.mockResolvedValue(product);

    expect(await service.findOne(1)).toEqual(product);
    expect(db.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if product not found', async () => {
    db.product.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should return random products', async () => {
    const randomProducts = [{ id: 2, name: 'Random Product' }];
    db.$queryRaw.mockResolvedValue(randomProducts);

    expect(await service.getRandom(1)).toEqual(randomProducts);
    expect(db.$queryRaw).toHaveBeenCalled();
  });
});
