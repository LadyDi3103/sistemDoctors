import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

export const rolAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let subscription: Subscription;
  let isAdmin = false;

  subscription = authService.rol$.subscribe((res: string) => {
    console.log(res);
    if (res === 'medico') {
      router.navigate(['/login']);
      isAdmin = false;
      return;
    }
    isAdmin = true;
    subscription.unsubscribe();
  });

  return isAdmin;
};
