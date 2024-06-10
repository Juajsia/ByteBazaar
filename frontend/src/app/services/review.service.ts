import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Msg, Review } from '../interfaces/review';
import { Observable } from 'rxjs';
import { simpleChartInfo } from '../interfaces/reports';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/review'
  }

  createReview(Review: Review): Observable<Review | Msg> {
    return this.http.post<Review | Msg>(`${this.myAppUrl}${this.myApiUrl}/`, Review)
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  getReview(ClientId: string, ProductId: number): Observable<Review> {
    return this.http.get<Review>(`${this.myAppUrl}${this.myApiUrl}/${ClientId}/${ProductId}`)
  }

  deleteReview(ClientId: string, ProductId: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${ClientId}/${ProductId}`)
  }
  
  updateReview(ClientId: string, ProductId: number, Review: Review): Observable<Review | Msg> {
    return this.http.put<Review | Msg>(`${this.myAppUrl}${this.myApiUrl}/${ClientId}/${ProductId}`, Review)
  }

  getReviewsByProduct(ProductId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.myAppUrl}${this.myApiUrl}/${ProductId}`)
  }

  getScoreCounting(ProductId: number): Observable<simpleChartInfo[]> {
    return this.http.get<simpleChartInfo[]>(`${this.myAppUrl}${this.myApiUrl}/score/counting/${ProductId}`)
  }

}
