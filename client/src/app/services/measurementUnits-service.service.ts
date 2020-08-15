import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeasurementUnit } from '../models/measurementUnit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitsService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getMeasurementUnits(): Observable<any> {
    return this.http.get(`${this.API_URI}/measurementUnits`);
  }

  getOneMeasurementUnit(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/measurementUnits/${id}`);
  }

  saveMeasurementUnit(measurementUnit: IMeasurementUnit) {
    return this.http.post(`${this.API_URI}/measurementUnits`, measurementUnit);
  }

  deleteMeasurementUnit(id: string) {
    return this.http.delete(`${this.API_URI}/measurementUnits/${id}`);
  }

  updateMeasurementUnit(id: string, updatedMeasurementUnit: IMeasurementUnit): Observable<any> {
    return this.http.put(`${this.API_URI}/measurementUnits/${id}`, updatedMeasurementUnit);
  }
}
