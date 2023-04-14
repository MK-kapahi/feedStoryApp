import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGaurdService } from './service/gaurds/main-gaurd.service';
import { AuthGaurdService } from './utils/gaurds/auth-gaurd.service';

const routes: Routes = [
  {
    path:'' ,redirectTo:'auth', pathMatch:'full'
  },
  {
    path:'auth' , loadChildren :() => import('./auth/auth.module').then((m)=>m.AuthModule),canActivate: [AuthGaurdService]
  },
  {
    path : 'main' , loadChildren :()=> import('./main/main.module').then((m)=>m.MainModule), canActivate :[MainGaurdService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
