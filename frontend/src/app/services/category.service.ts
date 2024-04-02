import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/category'
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.myAppUrl}${this.myApiUrl}/`, category)
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.myAppUrl}${this.myApiUrl}/${id}`, category)
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  getCategory(id: number): Observable<Category | any> {
    return this.http.get<Category | any>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
}
