import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TemperatureService } from './services/temperature.service';
import { ProductTemperatureModel } from './model/product-temperature.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code-challenge';

  productsTemperature: ProductTemperatureModel[] = [];
  data: any = {};

  constructor(
    private httpClient: HttpClient,
    private tempService: TemperatureService
  ) {
  }

  ngOnInit(): void {
    this.loadData();

    setInterval(() => {
      this.loadData();
    }, 5000);
  }

  /**
   * Load data from API and update productsTemperature
   * @return Promise<void>
   */
  async loadData(): Promise<void> {
    await this.tempService.getProductsTemperature().toPromise().then(async res => {
      await res.forEach(product => {
        const index = this.productsTemperature.map((e) => e.id).indexOf(product.id);
        if (index === -1) {
          this.productsTemperature.push(product);
        } else {
          this.productsTemperature[index] = Object.assign({}, product);
        }
      });
      Promise.resolve();
    });
  }

  /**
   * Get temperature string from product's min and max temperature
   * @param product ProductTemperatureModel
   * @return Promise<void>
   */
  showStatus(product: ProductTemperatureModel): string {
    product.status = this.tempService.showProductTemperatureStatus(product);
    return product.status;
  }
}
