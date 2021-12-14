import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly API_URL = 'http://localhost:8081';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Get all products
   * @param limit - number of products to get
   * @returns Observable<any>
   */
  getProducts(limit?: number): Observable<any> {
    if (limit === undefined) {
      limit = 20;
    }
    return this.httpClient.get(`${this.API_URL}/product?limit=` + limit);
  }

  /**
   * Get product by product id
   * @param id - product id
   * @returns Observable<any>
   */
  getProductById(id: string): Observable<any> | null {
    if (id === '') {
      return null;
    }
    return this.httpClient.get(`${this.API_URL}/product/${id}`);
  }
}
