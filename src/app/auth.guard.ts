import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    token: any;

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.token = localStorage.getItem('token');

        if(this.token){

            return true;

        } else {

            //this.router.parseUrl('/login');
            this.router.navigate(['login']);

        }

        return true;
  }
}