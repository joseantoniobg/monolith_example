import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterdace, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  checkStockUseCase: UseCaseInterface;
}


export default class ProductAdmFacade implements ProductAdmFacadeInterdace {
  private addUseCase: UseCaseInterface;
  private checkStockUseCase: UseCaseInterface;

  constructor(
    useCases: UseCaseProps
  ) {
    this.addUseCase = useCases.addUseCase;
    this.checkStockUseCase = useCases.checkStockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this.addUseCase.execute(input);
  }
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this.checkStockUseCase.execute(input);
  }
}