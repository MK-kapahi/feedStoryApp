import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { FireBaseService } from 'src/app/service/fire-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router : Router ,private service : FireBaseService ) { }
  canActivate(route: ActivatedRouteSnapshot):boolean{
    const { routeConfig } = route;
    const { path } = routeConfig as Route;
  if ( (path?.includes('home') || path?.includes('change') )&& !this.service.isLoggedIn()) {

    return true;
  }
  if ((path?.includes('sign-in') || path?.includes('login')) && !this.service.isLoggedIn()) {

    this.router.navigate(['home']);
    return false;
  }
  if ((path?.includes('sign-in') || path?.includes('login')) && this.service.isLoggedIn()) {

    return true;

  }
  this.router.navigateByUrl('/login')
  return false;
}
}
