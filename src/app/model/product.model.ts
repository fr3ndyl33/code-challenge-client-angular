
export class ProductModel {
  id: string;
  name: string;
  minimumTemperature: number;
  maximumTemperature: number;

  constructor(id, name, minTemp, maxTemp) {
    this.id = id;
    this.name = name;
    this.minimumTemperature = minTemp;
    this.maximumTemperature = maxTemp;
  }
}
