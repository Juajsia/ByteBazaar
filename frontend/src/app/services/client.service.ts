import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/client'
   }
   
   createClient(client:Client): Observable<Client[]>{
    return this.http.post<Client[]>(`${this.myAppUrl}${this.myApiUrl}/`, client)
   }
}
