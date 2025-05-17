import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.getUserData();
  if(user) {
    return true;
  } else {
    router.navigate(['/bejelentkezes']);
    return false;
  }
};
