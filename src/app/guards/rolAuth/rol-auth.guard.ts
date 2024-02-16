import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';

export const rolAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let subscription: Subscription;
  let isAdmin = false;

  subscription = authService.rol$
    .pipe(
      map((res: string) => {
        if (res === 'medico') {
          router.navigate(['/login']);
          isAdmin = false;
        } else {
          isAdmin = true;
        }
      })
    )
    .subscribe();

  subscription.unsubscribe();

  return isAdmin;
};
