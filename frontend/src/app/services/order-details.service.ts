import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/orderDetails'
  }

  getBestSellers(top: boolean): Observable<Product[]> {
    let param = '?top=n'
    if (top)
      param = '?top=y'
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}/bestSellers${param}`)
  }
  generatePdf(id: number): Observable<Blob> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/order/bill/${id}`, { responseType: 'blob' });
  }
}
