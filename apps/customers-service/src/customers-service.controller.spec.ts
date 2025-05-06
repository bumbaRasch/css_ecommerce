import { Test, TestingModule } from '@nestjs/testing';
import { CustomersServiceController } from './customers-service.controller';
import { CustomersServiceService } from './customers-service.service';

describe('CustomersServiceController', () => {
  let customersServiceController: CustomersServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomersServiceController],
      providers: [CustomersServiceService],
    }).compile();

    customersServiceController = app.get<CustomersServiceController>(CustomersServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customersServiceController.getHello()).toBe('Hello World!');
    });
  });
});
