import { Test, TestingModule } from '@nestjs/testing';
import { NyNameController } from './ny-name.controller';

describe('NyNameController', () => {
  let controller: NyNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NyNameController],
    }).compile();

    controller = module.get<NyNameController>(NyNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
