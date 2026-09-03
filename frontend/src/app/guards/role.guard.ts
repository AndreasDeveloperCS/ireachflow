import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredRoles = (route.data['roles'] as UserRole[]) ?? [];
    if (requiredRoles.length === 0 || this.authService.hasRole(...requiredRoles)) {
      return true;
    }
    return this.router.createUrlTree(['/app/dashboard']);
  }
}
