import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
  };
}

describe('Find Product Usecase Unit Tests', () => {
  it('should find a product', async () => {
    const repository = MockRepository();
    const usecase = new FindProductUseCase(repository);
    const product = await usecase.execute({ id: '1' });

    expect(repository.find).toHaveBeenCalledTimes(1);
    expect(repository.find).toHaveBeenCalledWith('1');
    expect(product.id).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Description 1');
    expect(product.salesPrice).toBe(100);
  });
});