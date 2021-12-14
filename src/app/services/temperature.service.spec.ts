import { TestBed } from '@angular/core/testing';

import { TemperatureService } from './temperature.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductTemperatureModel } from '../model/product-temperature.model';

describe('TemperatureService', () => {
  let service: TemperatureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TemperatureService]
    });
    service = TestBed.inject(TemperatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProductsTemperature', () => {
    it('is defined', () => {
      expect(service.getProductsTemperature).not.toBeUndefined();
    });
    it('should return expected result in json array following product-temperature model', () => {
      const limit = 1;
      const mockResponse = [{
        id: '1',
        name: 'Product 1',
        minimumTemperature: 1,
        maximumTemperature: 6,
        temperature: 5,
      }];
      service.getProductsTemperature(limit).subscribe(result => {
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        const temperature = result[0];
        expect(temperature.id).toBeInstanceOf(String);
        expect(temperature.name).toBeInstanceOf(String);
        expect(temperature.minimumTemperature).toBeInstanceOf(Number);
        expect(temperature.maximumTemperature).toBeInstanceOf(Number);
        expect(temperature.temperature).toBeInstanceOf(Number);
      });

      const req = httpMock.expectOne(`${service.API_URL}/temperature?limit=` + limit);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      httpMock.verify();
    });
  });

  describe('#getTempByProductId', () => {
    it('is defined', () => {
      expect(service.getTempByProductId).not.toBeUndefined();
    });
    it('should return null for empty product id', () => {
      expect(service.getTempByProductId('')).toBeNull();
    });
    it('should return expected result for given product id', () => {
      const productId = '1';
      const mockResponse = {
        id: '1',
        name: 'Product 1',
        minimumTemperature: 1,
        maximumTemperature: 6,
        temperature: 5,
      };
      service.getTempByProductId(productId)?.toPromise().then(temp => {
        const temperature = temp;
        expect(temperature.id.toString()).toEqual(productId);
        expect(temperature.temperature).toBeInstanceOf(Number);
      });

      const req = httpMock.expectOne(`${service.API_URL}/temperature/${productId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      httpMock.verify();
    });
  });

  describe('#showProductTemperatureStatus', () => {
    const product = new ProductTemperatureModel('1', 'ProductName', 4, 6, 0, '');

    it('is defined', () => {
      expect(service.showProductTemperatureStatus).not.toBeUndefined();
    });
    it('should return status if temperature lower than minimum', () => {
      product.temperature = 1;
      expect(service.showProductTemperatureStatus(product)).toContain('too low');
    });
    it('should return status if temperature higher than maximum', () => {
      product.temperature = 7;
      expect(service.showProductTemperatureStatus(product)).toContain('too high');
    });
    it('should return status if temperature between low and high', () => {
      product.temperature = 5;
      expect(service.showProductTemperatureStatus(product)).toContain('all good');
    });
  });
});
