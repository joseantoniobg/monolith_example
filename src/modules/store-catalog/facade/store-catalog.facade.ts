import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUsecase;
}


export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private findUseCase: FindProductUseCase;
  private findAllUseCase: FindAllProductsUsecase;

  constructor(private props: UseCaseProps) {
    this.findUseCase = props.findUseCase;
    this.findAllUseCase = props.findAllUseCase;
  }

  async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this.findUseCase.execute(input);
  }
  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this.findAllUseCase.execute();
  }
}