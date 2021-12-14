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

  getProducts(limit?: number): Observable<any> {
    if (limit === undefined) {
      limit = 20;
    }
    return this.httpClient.get(`${this.API_URL}/product?limit=` + limit);
  }

  getProductById(id: string): Observable<any> | null {
    if (id === '') {
      return null;
    }
    return this.httpClient.get(`${this.API_URL}/product/${id}`);
  }
}
