import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBrand } from '../models/brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getBrands(): Observable<any> {
    return this.http.get(`${this.API_URI}/brands`);
  }

  getOneBrand(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/brands/${id}`);
  }

  saveBrand(brand: IBrand) {
    return this.http.post(`${this.API_URI}/brands`, brand);
  }

  deleteBrand(id: string) {
    return this.http.delete(`${this.API_URI}/brands/${id}`);
  }

  updateBrand(id: string, updatedBrand: IBrand): Observable<any> {
    return this.http.put(`${this.API_URI}/brands/${id}`, updatedBrand);
  }
}
