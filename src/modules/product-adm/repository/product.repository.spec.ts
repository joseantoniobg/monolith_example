import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductRepository from "./product.repository";

describe('Product Repository unit test', () => {
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

  it('should add a product', async () => {
    const productRepository = new ProductRepository();

    const productProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    };

    const product = new Product(productProps);

    await productRepository.add(product);

    const result = await ProductModel.findOne({ where: { id: '1' } });

    expect(result).toBeDefined();
    expect(result.dataValues.id).toBe('1');
    expect(result.dataValues.name).toBe('Product 1');
    expect(result.dataValues.description).toBe('Description 1');
    expect(result.dataValues.purchasePrice).toBe(100);
    expect(result.dataValues.stock).toBe(10);
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();

    const productModel = await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await productModel.save();

    const result = await productRepository.find('1');

    expect(result).toBeDefined();
    expect(result.id.id).toBe('1');
    expect(result.name).toBe('Product 1');
    expect(result.description).toBe('Description 1');
    expect(result.purchasePrice).toBe(100);
    expect(result.stock).toBe(10);
  });
});