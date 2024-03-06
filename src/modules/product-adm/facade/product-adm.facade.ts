import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterdace, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}


export default class ProductAdmFacade implements ProductAdmFacadeInterdace {
  private addUseCase: UseCaseInterface;
  private stockUseCase: UseCaseInterface;

  constructor(
    useCases: UseCaseProps
  ) {
    this.addUseCase = useCases.addUseCase;
    this.stockUseCase = useCases.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this.addUseCase.execute(input);
  }
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this.stockUseCase.execute(input);
  }
}