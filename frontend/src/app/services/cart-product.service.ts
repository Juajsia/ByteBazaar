import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from '../interfaces/cart';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/cartProduct'
  }

  addCartItem(cartProduct: CartProduct): Observable<object> {
    return this.http.post<object>(`${this.myAppUrl}${this.myApiUrl}/`, cartProduct)
  }

  deleteCartItem(cartProduct: CartProduct): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${cartProduct.CartId}/${cartProduct.ProductId}`)
  }

  clearCartItem(CartId: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${CartId}`)
  }

  updateCartItem(cartProduct: CartProduct): Observable<CartProduct[]> {
    return this.http.put<CartProduct[]>(`${this.myAppUrl}${this.myApiUrl}/${cartProduct.CartId}/${cartProduct.ProductId}`, cartProduct)
  }

  getBestSellers(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}/bestSellers`)
  }
}
