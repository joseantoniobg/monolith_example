import { AddProductUseCase } from "./add.product.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe('Add Product UseCase unit test', () => {
  it('should add a product', async () => {
    const input = {
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    }

    const mockRepository = MockRepository();
    const usecase = new AddProductUseCase(mockRepository);

    const result = await usecase.execute(input);

    expect(mockRepository.add).toBeCalledTimes(1);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});