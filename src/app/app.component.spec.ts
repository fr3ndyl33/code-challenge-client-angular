import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TemperatureService } from './services/temperature.service';
import { of } from 'rxjs';
import { ProductTemperatureModel } from './model/product-temperature.model';
import arrayContaining = jasmine.arrayContaining;

describe('AppComponent', () => {
  let fixture: ComponentFixture<any>;
  let app: any;
  let temperatureService: TemperatureService;
  let mockTemperatureService: any;
  let spyTemperatureService: jasmine.Spy;
  let spyComponentLoadData: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        HttpClientModule,
        TemperatureService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    temperatureService = TestBed.inject(TemperatureService);
    mockTemperatureService = fixture.debugElement.injector.get(TemperatureService);
    spyComponentLoadData = spyOn(app, 'loadData');
    spyTemperatureService = spyOn(temperatureService, 'getProductsTemperature')
      .and.returnValue(of([
        new ProductTemperatureModel('1', 'Product 1', 1, 3, 2, ''),
        new ProductTemperatureModel('1', 'Product 2', 4, 5, 6, ''),
      ]));
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should show title', () => {
    expect(fixture.nativeElement.querySelector('.test-title')).toBeTruthy();
  });
  it('should show Products Temperature table', () => {
    expect(fixture.nativeElement.querySelector('.test-table')).toBeTruthy();
  });

  describe('#loadData', () => {
    it('should be defined', () => {
      expect(app.loadData).toBeTruthy();
    });
    it('should be called once on component Init', () => {
      app.ngOnInit();
      expect(spyComponentLoadData).toHaveBeenCalled();
    });
    it('should be called once every 5000ms on component Init', fakeAsync((): void => {
      app.ngOnInit();
      tick(5000);
      expect(spyComponentLoadData).toHaveBeenCalled();
      discardPeriodicTasks();
    }));
    it('should call getProductsTemperature from TemperatureService', fakeAsync((): void => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      app.loadData();
      tick(5000);
      expect(spyTemperatureService).toHaveBeenCalled();
      discardPeriodicTasks();
    }));
    it('should call getProductsTemperature and return data', fakeAsync((): void => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      app.loadData();
      tick(5000);
      expect(app.productsTemperature.length).toBeGreaterThanOrEqual(1);
      expect(app.productsTemperature).toEqual([
          jasmine.objectContaining({
            id: jasmine.any(String),
            name: jasmine.any(String),
            minimumTemperature: jasmine.any(Number),
            maximumTemperature: jasmine.any(Number),
            temperature: jasmine.any(Number),
          })
        ]
      );
    }));
  });

  describe('#showStatus', () => {
    const productTemperature = new ProductTemperatureModel('1', 'name', 0, 0, 0, '');
    it('should be defined', () => {
      expect(app.showStatus).toBeTruthy();
    });
    it('should show the right status if temperature is lower than min temp', () => {
      productTemperature.minimumTemperature = 3;
      productTemperature.temperature = 2;
      expect(app.showStatus(productTemperature)).toEqual('too low');
    });
    it('should show the right status if temperature is higher than max temp', () => {
      productTemperature.maximumTemperature = 3;
      productTemperature.temperature = 4;
      expect(app.showStatus(productTemperature)).toEqual('too high');
    });
    it('should show the right status if temperature is okay', () => {
      productTemperature.minimumTemperature = 3;
      productTemperature.maximumTemperature = 5;
      productTemperature.temperature = 4;
      expect(app.showStatus(productTemperature)).toEqual('all good');
    });
  });
});
