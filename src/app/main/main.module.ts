import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {  RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGaurdService } from '../utils/gaurds/auth-gaurd.service';
import { ProfileComponent } from './profile/profile.component';


const route : Routes = [
  {
      path : 'home' , component: HomeComponent , canActivate : [AuthGaurdService]
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ],
  exports : [RouterModule]
})
export class MainModule { }
