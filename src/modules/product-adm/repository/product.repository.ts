import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGatewayInterface from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGatewayInterface {
  async add(product: Product): Promise<void> {
    try {
      await ProductModel.create({
        id: product.id.id,
        name: product.name,
        description: product.description,
        purchasePrice: product.purchasePrice,
        stock: product.stock,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });

    if (!productModel) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Product({
      id: new Id(productModel.dataValues.id),
      name: productModel.dataValues.name,
      description: productModel.dataValues.description,
      purchasePrice: productModel.dataValues.purchasePrice,
      stock: productModel.dataValues.stock,
      createdAt: productModel.dataValues.createdAt,
      updatedAt: productModel.dataValues.updatedAt,
    });
  }
}