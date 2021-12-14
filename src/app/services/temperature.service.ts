import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductTemperatureModel } from '../model/product-temperature.model';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  readonly API_URL = 'http://localhost:8081';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Get all products with its current temperature
   * @param limit - number of products to return
   * @returns Observable<any>
   */
  getProductsTemperature(limit?: number): Observable<any> {
    if (limit === undefined) {
      limit = 20;
    }
    return this.httpClient.get(`${this.API_URL}/temperature?limit=` + limit);
  }

  /**
   * Get certain product with its current temperature
   * @param id - product id
   * @returns Observable<any>|null
   */
  getTempByProductId(id: string): Observable<any> | null {
    if (id === '') {
      return null;
    }
    return this.httpClient.get(`${this.API_URL}/temperature/${id}`);
  }

  /**
   * Get temperature status in string
   * @param product - ProductTemperatureModel
   * @returns string
   */
  showProductTemperatureStatus(product: ProductTemperatureModel): string {
    if (product.temperature < product.minimumTemperature) {
      return 'too low';
    }else if (product.temperature > product.maximumTemperature) {
      return 'too high';
    }else {
      return 'all good';
    }
  }
}
