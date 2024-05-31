import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = '/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, emailData);
  }
}
