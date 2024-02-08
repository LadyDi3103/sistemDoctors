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

  private rolSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  rol$ = this.rolSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }
  // login(data: any) {
  //   return this.http
  //     .post(environment.BASE_URL_BACK + '/auth/login', data, {
  //       observe: 'response',
  //     })
  //     .pipe(
  //       map((res: HttpResponse<any>) => {
  //         console.log(res, 'RES STATUS');
  //         if (res.status === 200) {
  //           console.log('ENTRA');
  //           const body = res.body;
  //           localStorage.setItem('token', body.token);
  //           this.isAuthenticatedSubject.next(true);
  //           console.log(body.user.rol);
  //           this.rolSubject.next(body.user.rol);
  
  //           // Redirigir según el rol del usuario
  //           if (body.user.rol === 'medico') {
  //             this.router.navigate(['/dashboard']);
  //           } else if (body.user.rol === 'admin') {
  //             this.router.navigate(['/home-admin']);
  //           } else {
  //             console.log('Rol desconocido, no se puede redirigir.');
  //           }
  //         }
  //         return res;
  //       })
  //     );
  // }
  login(data: any) {
    return this.http.post(environment.BASE_URL_BACK + '/auth/login', data, {
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

          // Redirigir según el rol del usuario
          if (body.user.rol === 'admin') {
            this.router.navigate(['/home-admin']);
          } else {
            this.router.navigate(['/dashboard']); // Cambiar según la ruta del dashboard
          }
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
    return !!this.isAuthenticatedSubject.value;
  }
  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }
}
