import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl
  private apiUrl = `${this.baseUrl}/auth`;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { name, password });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    // optionally call backend logout
    this.http.post(`${this.apiUrl}/logout`, {}, { responseType: 'text' }).subscribe({});
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return new HttpHeaders();
  }
}
