import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add.product.usecase";
import ProductAdmFacade from "./product-adm.facade";

describe('Product Adm Facade unit test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
      models: [ProductModel],
    });

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should create a product', async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new AddProductUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: productUseCase,
      checkStockUseCase: undefined,
    });

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    }

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: '1' } });

    expect(product).toBeDefined();
  })
});