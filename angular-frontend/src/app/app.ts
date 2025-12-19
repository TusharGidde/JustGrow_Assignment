import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title ="angular-frontend";
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
