import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  title = 'sistem';

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      // this.router.navigate(['/login']);
      return;
    }
    this.authService.setAuthenticated(true);
    this.router.navigate(['/dashboard']);
  }
}
