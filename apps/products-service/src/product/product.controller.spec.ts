import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    getRandom: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      getRandom: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: service }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should return all products', async () => {
    const products = [{ id: 1, name: 'Product A' }];
    service.findAll.mockResolvedValue(products);

    expect(await controller.findAll()).toEqual(products);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one product by id', async () => {
    const product = { id: 1, name: 'Product A' };
    service.findOne.mockResolvedValue(product);

    expect(await controller.findOne(1)).toEqual(product);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should return random products', async () => {
    const products = [{ id: 2, name: 'Random Product' }];
    service.getRandom.mockResolvedValue(products);

    expect(await controller.getRandom(1)).toEqual(products);
    expect(service.getRandom).toHaveBeenCalledWith(1);
  });
});
