import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sales, simpleChartInfo } from '../interfaces/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/reports'
  }

  getSales(timeLapse: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/sales/${timeLapse}`)
  }

  getBestSellers(): Observable<simpleChartInfo>{
    return this.http.get<simpleChartInfo>(`${this.myAppUrl}${this.myApiUrl}/bestSellers`)
  }

  getNumProductsByCategory(): Observable<simpleChartInfo>{
    return this.http.get<simpleChartInfo>(`${this.myAppUrl}${this.myApiUrl}/categories`)
  }

  getRegisteredUsers(): Observable<simpleChartInfo>{
    return this.http.get<simpleChartInfo>(`${this.myAppUrl}${this.myApiUrl}/registeredUsers`)
  }
}
