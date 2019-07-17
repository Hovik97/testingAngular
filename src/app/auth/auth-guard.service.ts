import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Global } from '../global/globals';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router, public globals: Global, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.me().pipe(map(res => {
      this.globals.authenticationUser = res.user;
      return true;
    }));
  }

}
