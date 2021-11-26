import { ProductModel } from './product.model';

export class ProductTemperatureModel extends ProductModel{
  temperature: number;
  status: string;

  constructor(id, name, minTemp, maxTemp, temp, status) {
    super(id, name, minTemp, maxTemp);
    this.temperature = temp;
    this.status = status;
  }
}
