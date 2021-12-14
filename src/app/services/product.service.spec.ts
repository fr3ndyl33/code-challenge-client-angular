import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TemperatureService } from './temperature.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TemperatureService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProducts', () => {
    it('is defined', () => {
      expect(service.getProducts).not.toBeUndefined();
    });
    it('should return expected result in json array following product model', () => {
      const limit = 1;
      const mockResponse = [{
        id: '1',
        name: 'Product 1',
        minimumTemperature: 1,
        maximumTemperature: 6,
      }];
      service.getProducts(limit).subscribe(result => {
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        const temperature = result[0];
        expect(temperature.id).toBeInstanceOf(String);
        expect(temperature.name).toBeInstanceOf(String);
        expect(temperature.minimumTemperature).toBeInstanceOf(Number);
        expect(temperature.maximumTemperature).toBeInstanceOf(Number);
      });

      const req = httpMock.expectOne(`${service.API_URL}/product?limit=` + limit);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      httpMock.verify();
    });
  });

  describe('#getProductById', () => {
    it('is defined', () => {
      expect(service.getProductById).not.toBeUndefined();
    });
    it('should return null for empty product id', () => {
      expect(service.getProductById('')).toBeNull();
    });
    it('should return expected result for given product id', () => {
      const productId = '1';
      const mockResponse = {
        id: '1',
        name: 'Product 1',
        minimumTemperature: 1,
        maximumTemperature: 6,
      };
      service.getProductById(productId)?.toPromise().then(temp => {
        const temperature = temp;
        expect(temperature.id.toString()).toEqual(productId);
        expect(temperature.name).toBeInstanceOf(String);
        expect(temperature.minimumTemperature).toBeInstanceOf(Number);
        expect(temperature.maximumTemperature).toBeInstanceOf(Number);
      });

      const req = httpMock.expectOne(`${service.API_URL}/product/${productId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      httpMock.verify();
    });
  });
});
