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
  if ( (path?.includes('main') )&& !this.service.isLoggedIn()) {

    return true;
  }
  if ((path?.includes('auth')) && !this.service.isLoggedIn()) {

    this.router.navigate(['main/home']);
    return false;
  }
  if ((path?.includes('auth') ) && this.service.isLoggedIn()) {

    return true;

  }
  this.router.navigateByUrl('auth/login')
  return false;
}
}
