import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/wishlist'
  }

  getWishlistItems(id: number): Observable<Wishlist> {
    return this.http.get<Wishlist>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
}
