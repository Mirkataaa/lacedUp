import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.getProfile().pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        if (next.data['role'] && !next.data['role'].includes(user.role)) {
          this.router.navigate(['/profile']);
          return false;
        }
        return true;
      })
    );
  }
}
