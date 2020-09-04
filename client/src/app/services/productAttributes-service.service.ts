import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductAttribute } from '../models/productAttribute';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributesService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getProductAttributes(): Observable<any> {
    return this.http.get(`${this.API_URI}/productAttributes`);
  }

  getOneProductAttribute(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/productAttributes/${id}`);
  }

  saveProductAttribute(productAttribute: IProductAttribute) {
    return this.http.post(`${this.API_URI}/productAttributes`, productAttribute);
  }

  deleteProductAttribute(id: string) {
    return this.http.delete(`${this.API_URI}/productAttributes/${id}`);
  }

  updateProductAttribute(id: string, updatedProductAttribute: IProductAttribute): Observable<any> {
    return this.http.put(`${this.API_URI}/productAttributes/${id}`, updatedProductAttribute);
  }
}
