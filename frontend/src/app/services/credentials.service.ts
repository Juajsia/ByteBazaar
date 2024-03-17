import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from '../interfaces/credential';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/credential'
  }

  login(user: Credential): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }
}
