import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../model/product.model';
import { ProductTemperatureModel } from '../model/product-temperature.model';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  readonly API_URL = 'http://localhost:8081';

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductsTemperature(limit?: number): Observable<any> {
    if (limit === undefined) {
      limit = 20;
    }
    return this.httpClient.get(`${this.API_URL}/temperature?limit=` + limit);
  }

  getTempByProductId(id: string): Observable<any> | null {
    if (id === '') {
      return null;
    }
    return this.httpClient.get(`${this.API_URL}/temperature/${id}`);
  }

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
