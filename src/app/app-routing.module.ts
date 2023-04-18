import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGaurdService } from './service/gaurds/main-gaurd.service';
import { AuthGaurdService } from './service/gaurds/auth-gaurd.service'
import { ConstantData } from './utils/constant';

const routes: Routes = [
  {
    path:'' ,redirectTo:ConstantData.Path.AUTH, pathMatch:'full'
  },
  {
    path:ConstantData.Path.AUTH , loadChildren :() => import('./auth/auth.module').then((m)=>m.AuthModule),canActivate: [AuthGaurdService]
  },
  {
    path : ConstantData.Path.MAIN , loadChildren :()=> import('./main/main.module').then((m)=>m.MainModule), canActivate :[MainGaurdService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
