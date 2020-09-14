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

  getProductFeatures(productID): Observable<any> {
    return this.http.get(`${this.API_URI}/productFeatures/${productID}`);
  }

  getOneProductFeature(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/productFeatures/${id}`);
  }

  saveProductFeature(productFeature: IProductFeature) {
    return this.http.post(`${this.API_URI}/productFeatures`, productFeature);
  }

  deleteProductFeature(id: string) {
    return this.http.delete(`${this.API_URI}/productFeatures/${id}`);
  }

  updateProductFeature(id: string, updatedProductFeature: IProductFeature): Observable<any> {
    return this.http.put(`${this.API_URI}/productFeatures/${id}`, updatedProductFeature);
  }
}
