import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.getUserData();
  if(!user) {
    return true;
  }
  router.navigate(['/fomenu']);
  return false;
};
