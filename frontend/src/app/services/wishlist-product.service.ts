import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from '../interfaces/cart';
import { Observable } from 'rxjs';
import { Wishlist, WishlistProduct } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistProductService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/wishlistProduct'
  }

  addWishlistItem(wishlistProduct: WishlistProduct): Observable<object> {
    return this.http.post<object>(`${this.myAppUrl}${this.myApiUrl}/`, wishlistProduct)
  }

  getWishlistItem (wishlistId: number, prodId: number): Observable<Wishlist> {
    return this.http.get<Wishlist>(`${this.myAppUrl}${this.myApiUrl}/${wishlistId}/${prodId}`)
  }

  checkWishlistItemExistence (wishlistId: number, prodId: number): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/check/${wishlistId}/${prodId}`)
  }

  deleteWishlistItem(wishlistProduct: WishlistProduct): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${wishlistProduct.WishlistId}/${wishlistProduct.ProductId}`)
  }
}
