import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILabel } from '../models/label';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  API_URI = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getLabels(): Observable<any> {
    return this.http.get(`${this.API_URI}/labels`);
  }

  getOneLabel(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/labels/${id}`);
  }

  saveLabel(label: ILabel) {
    return this.http.post(`${this.API_URI}/labels`, label);
  }

  deleteLabel(id: string) {
    return this.http.delete(`${this.API_URI}/labels/${id}`);
  }

  updateLabel(id: string, updatedLabel: ILabel): Observable<any> {
    return this.http.put(`${this.API_URI}/labels/${id}`, updatedLabel);
  }
}
