import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check.stock.usecase";

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  purchasePrice: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
  }
}

describe('Checkstock usecase unit test', () => {
  it('should get stock of a product', async () => {
    const repository = MockRepository();
    const usecase = new CheckStockUseCase(repository);
    const result = await usecase.execute({ productId: '1' });

    expect(result).toEqual({ productId: '1', stock: 10 });

    expect(repository.find).toHaveBeenCalled();
  });
})