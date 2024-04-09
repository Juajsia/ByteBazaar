import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { msg } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/order'
  }

  createOrder(order: Order): Observable<Order | msg> {
    return this.http.post<Order | msg>(`${this.myAppUrl}${this.myApiUrl}/`, order)
  }
}