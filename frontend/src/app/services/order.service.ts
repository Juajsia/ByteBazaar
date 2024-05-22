import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/`)
  }
  getClientHistory(clientId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/history/${clientId}`)
  }


  returnOrder(id: number): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { isReturned: true })
  }
}


