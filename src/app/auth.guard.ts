import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FetchApiDataService } from './fetch-api-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: FetchApiDataService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem('token');
    let authorized = this.loginService.setloggedInStatus(token);
    if (!authorized) {
      this.router.navigate(['welcome'])
    }
    return authorized;
  }
}