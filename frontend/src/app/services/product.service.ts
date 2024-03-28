import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, msg } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/product'
  }

  createProduct(product: Product): Observable<Product[] | msg> {
    return this.http.post<Product[] | msg>(`${this.myAppUrl}${this.myApiUrl}/`, product)
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  getProduct(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}/${name}`)
  }

  deleteProduct(name: string): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}/${name}`)
  }

  updateProduct(name: string, product: Product): Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${name}`, product)
  }
}
