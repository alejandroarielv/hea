import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.API_URI}/products`);
  }

  getOneProduct(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/products/${id}`);
  }

  saveProduct(product: IProduct) {
    return this.http.post(`${this.API_URI}/products`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URI}/products/${id}`);
  }

  updateProduct(id: string, updatedProduct: IProduct): Observable<any> {
    return this.http.put(`${this.API_URI}/products/${id}`, updatedProduct);
  }
}
