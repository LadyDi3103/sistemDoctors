import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<Boolean> =
    new BehaviorSubject<Boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private rolSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    false
  );
  rol$ = this.rolSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {}
  login(data: any) {
    return this.http
      .post(environment.BASE_URL_BACK + '/auth/login', data, {
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<any>) => {
          console.log(res, 'RES STATUS');

          if (res.status === 200) {
            console.log('ENTRA');
            const body = res.body;
            localStorage.setItem('token', body.token);
            this.isAuthenticatedSubject.next(true);
            console.log(body.user.rol);
            this.rolSubject.next(body.user.rol);
            this.router.navigate(['/dashboard']);
          }
          return res;
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  isAuthenticated() {
    return !!this.getToken();
  }
}
