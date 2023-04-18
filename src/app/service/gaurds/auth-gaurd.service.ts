import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { collectionGroup } from 'firebase/firestore';
import { FireBaseService } from 'src/app/service/fire-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router : Router ,private service : FireBaseService ) { }
  canActivate(route: ActivatedRouteSnapshot):boolean{
  const token =localStorage.getItem('token');
    if(token)   
    {
      this.router.navigateByUrl('auth')
      return false;
    } 
    return true;
}
}