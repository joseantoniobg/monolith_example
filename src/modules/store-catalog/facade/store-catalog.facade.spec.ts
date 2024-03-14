import { Sequelize } from "sequelize-typescript"
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe('StoreCatalogFacade tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: true,
      sync: { force: true },
      models: [ProductModel],
    });

    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('Should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    });

    const facade = StoreCatalogFacadeFactory.create();

    const result = await facade.find({ id: '1' });

    expect(result).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    });
  })

  it('Should find all products', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    });

    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200,
    });

    const facade = StoreCatalogFacadeFactory.create();

    const result = await facade.findAll();

    expect(result.products[0]).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    });

    expect(result.products[1]).toEqual({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200,
    });
  })
})