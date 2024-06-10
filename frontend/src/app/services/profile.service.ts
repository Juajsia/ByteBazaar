import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000'
  }

  uploadImage(imageFile: File, clientId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('profileImage', imageFile, imageFile.name);
    formData.append('id', clientId);
    return this.http.post(`${this.myAppUrl}/upload`, formData);
  }
}
