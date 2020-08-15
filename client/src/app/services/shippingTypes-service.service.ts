import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IShippingType } from '../models/shippingType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingTypesService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getShippingTypes(): Observable<any> {
    return this.http.get(`${this.API_URI}/shippingTypes`);
  }

  getOneShippingType(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/shippingTypes/${id}`);
  }

  saveShippingType(shippingType: IShippingType) {
    return this.http.post(`${this.API_URI}/shippingTypes`, shippingType);
  }

  deleteShippingType(id: string) {
    return this.http.delete(`${this.API_URI}/shippingTypes/${id}`);
  }

  updateShippingType(id: string, updatedShippingType: IShippingType): Observable<any> {
    return this.http.put(`${this.API_URI}/shippingTypes/${id}`, updatedShippingType);
  }
}
