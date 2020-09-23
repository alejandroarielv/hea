import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductShippingType } from '../models/product-shippingType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductShippingTypesService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getProductShippingTypes(productID): Observable<any> {
    return this.http.get(`${this.API_URI}/productShippingTypes/${productID}`);
  }

  getOneProductShippingType(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/productShippingTypes/${id}`);
  }

  saveProductShippingTypes(productShippingTypes: IProductShippingType[]) {
    return this.http.post(`${this.API_URI}/productShippingTypes`, productShippingTypes);
  }

  deleteProductShippingType(id: number) {
    return this.http.delete(`${this.API_URI}/productShippingTypes/${id}`);
  }

  updateProductShippingTypes(updatedProductShippingTypes: IProductShippingType[]): Observable<any> {
    return this.http.put(`${this.API_URI}/productShippingTypes/`, updatedProductShippingTypes);
  }
}
