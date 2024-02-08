import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    request = request.clone({
      headers: headers,
    });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && err.error === 'Unauthorized') {
          Swal.fire({
            title: 'Token expired',
            text: 'Su sesión expiró, vuelve a iniciar sesión',
            icon: 'warning',
          });
          console.log(err, 'ERRORORROROROROROR');
          this.router.navigate(['/login']);
          this.authService.removeToken();
          this.authService.setAuthenticated(false);
        } else if (
          err.status === 403 &&
          err.error ===
            'Acceso denegado. Se requieren privilegios de administrador.'
        ) {
          Swal.fire({
            title: 'Acceso denegado',
            text: 'No tienes privilegios de administrador',
            icon: 'warning',
          });
          console.log(err, 'ERRORORROROROROROROR');
          this.router.navigate(['/login']);
          this.authService.removeToken();
          this.authService.setAuthenticated(false);
        } else if (err.status === 500) {
          Swal.fire({
            title: 'Error',
            text: 'Error en el servidor, vuelve a intentarlo',
            icon: 'error',
          });
        }
        return throwError(() => err);
      })
    );
  }
}
