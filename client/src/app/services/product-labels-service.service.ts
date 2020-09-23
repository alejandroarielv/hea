import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductLabel } from '../models/product-label';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductLabelsService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getProductLabels(productID): Observable<any> {
    return this.http.get(`${this.API_URI}/productLabels/${productID}`);
  }

  getOneProductLabel(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/productLabels/${id}`);
  }

  saveProductLabels(productLabels: IProductLabel[]) {
    return this.http.post(`${this.API_URI}/productLabels`, productLabels);
  }

  deleteProductLabel(id: number) {
    return this.http.delete(`${this.API_URI}/productLabels/${id}`);
  }

  updateProductLabels(updatedProductLabels: IProductLabel[]): Observable<any> {
    return this.http.put(`${this.API_URI}/productLabels/`, updatedProductLabels);
  }
}
