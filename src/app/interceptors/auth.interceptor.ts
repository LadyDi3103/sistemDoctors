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
        if (
          err.status === 401 ||
          err.status === 500 ||
          err.status === 0 ||
          err.message === 'Token is invalid'
        ) {
          // Redireccionar aqui
          this.router.navigate(['/login']);
          this.authService.removeToken();
          this.authService.setAuthenticated(false);
          // window.location.reload();
        }
        return throwError(() => err);
      })
    );
  }
}
