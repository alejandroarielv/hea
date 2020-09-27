import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductFeature } from '../models/product-feature';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFeaturesService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getProductFeatures(productID: number): Observable<any> {
    return this.http.get(`${this.API_URI}/productFeatures/${productID}`);
  }

  getOneProductFeature(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/productFeatures/${id}`);
  }

  saveProductFeature(productFeatures: IProductFeature[]) {
    return this.http.post(`${this.API_URI}/productFeatures`, productFeatures);
  }

  deleteProductFeature(ids: number[]) {
    return this.http.delete(`${this.API_URI}/productFeatures/`, ids);
  }

  updateProductFeature(updatedProductFeatures: IProductFeature[]): Observable<any> {
    return this.http.put(`${this.API_URI}/productFeatures/`, updatedProductFeatures);
  }
}
