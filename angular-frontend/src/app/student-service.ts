import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private BASE_URL = `${environment.apiUrl}/students`;

  constructor(private httpClient: HttpClient, private authService: AuthService) {

  }

  getStudentsList(): Observable<Student[]> {
    // actual api call with auth header
    return this.httpClient.get<Student[]>(`${this.BASE_URL}`, { headers: this.authService.getAuthHeaders() });
  }

  createStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${this.BASE_URL}/`, student, { headers: this.authService.getAuthHeaders() });
  }

  updateStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.BASE_URL}/${student.id}`, student, { headers: this.authService.getAuthHeaders() });
  }

  deleteStudent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`, { headers: this.authService.getAuthHeaders() });
  }
}
