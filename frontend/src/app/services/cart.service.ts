import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/cart'
  }

  getCartItems(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.myAppUrl}${this.myApiUrl}/${cartId}`)
  }
}
