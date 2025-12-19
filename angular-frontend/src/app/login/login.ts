import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styles: [`
    .login-container { max-width: 400px; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    h2 { text-align:center; color:#333 }
    .form-row { margin-bottom:12px }
    label { display:block; margin-bottom:6px; font-weight:600 }
    input { width:100%; padding:8px; border:1px solid #ccc; border-radius:4px }
    button { padding:10px 14px; background:#4CAF50; color:#fff; border:none; border-radius:4px; cursor:pointer }
    .error { color:#b00020; margin-bottom:10px }
  `]
})
export class Login {
  name: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (!this.name || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }
    this.isLoading = true;
    this.authService.login(this.name, this.password).subscribe({
      next: (res) => {
        const token = res?.token;
        if (token) {
          this.authService.setToken(token);
          this.router.navigate(['/students']);
        } else {
          this.errorMessage = res?.error || 'Login failed';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Login failed';
        this.isLoading = false;
      }
    });
  }
}
