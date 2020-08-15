import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWeightUnit } from '../models/weightUnit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightUnitsService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getWeightUnits(): Observable<any> {
    return this.http.get(`${this.API_URI}/weightUnits`);
  }

  getOneWeightUnit(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/weightUnits/${id}`);
  }

  saveWeightUnit(weightUnit: IWeightUnit) {
    return this.http.post(`${this.API_URI}/weightUnits`, weightUnit);
  }

  deleteWeightUnit(id: string) {
    return this.http.delete(`${this.API_URI}/weightUnits/${id}`);
  }

  updateWeightUnit(id: string, updatedWeightUnit: IWeightUnit): Observable<any> {
    return this.http.put(`${this.API_URI}/weightUnits/${id}`, updatedWeightUnit);
  }
}
