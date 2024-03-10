import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Description 2',
  salesPrice: 200,
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue([product, product2]),
    find: jest.fn(),
  };
}

describe('FindAllProductsUsecase', () => {
  let repository: any;
  let usecase: FindAllProductsUsecase;

  beforeEach(() => {
    repository = MockRepository();
    usecase = new FindAllProductsUsecase(repository);
  });

  it('should find all Products', async () => {
    const response = await usecase.execute();
    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(response.products).toHaveLength(2);
    expect(response.products[0].id).toBe('1');
    expect(response.products[0].name).toBe('Product 1');
    expect(response.products[0].description).toBe('Description 1');
    expect(response.products[0].salesPrice).toBe(100);
    expect(response.products[1].id).toBe('2');
    expect(response.products[1].name).toBe('Product 2');
    expect(response.products[1].description).toBe('Description 2');
    expect(response.products[1].salesPrice).toBe(200);
  });
});