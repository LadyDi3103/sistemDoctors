import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('ENTRA');
    if (this.authService.getToken()) {
      console.log('ENTRA1');

      this.authService.verifyToken().subscribe({
        next: (res: any) => {
          console.log(res, 'RESPONSE');
          // Aquí puedes procesar la respuesta según tus necesidades
          if (res.status === 'success' && res.message === 'Token valido') {
            this.authService.setAuthenticated(true);
            this.authService.setRole(res.role_name);
          }
        },
        error: (error) => {
          console.error('Error al verificar el token:', error);
          // Aquí puedes manejar el error, si ocurre alguno
        },
      });
      return;
    }
    // this.authService.removeToken();
  }

  logout(): void {
    this.authService.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
