import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const { data: { user } } = await this.authService.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    
    if (user.email === 'admin@mail.com') {
      return true;
    } else {
      console.error('Acceso denegado. Se requiere perfil de administrador.');
      this.router.navigate(['/home']);
      return false;
    }
  }
}

export const AdminGuardFn: CanActivateFn = (route, state) => inject(AdminGuard).canActivate(route, state);