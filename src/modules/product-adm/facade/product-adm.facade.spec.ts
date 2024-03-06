import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add.product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFacadeFactory from "../factory/facade.factory";

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
    const productFacade = ProductAdmFacadeFactory.create();

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

  it('should check product stock', async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    }

    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: '1' });

    expect(result).toEqual({ productId: '1', stock: 10 });
  })
});