import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


const route : Routes = [
  {
    path : 'sign-in' , component: SignUpComponent 
  },
  {
    path : 'login' , component: LoginComponent 
  },
  {
    path : 'forgot' , component: ForgotComponent 
  }
]
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
  ],
  exports :[RouterModule]
})
export class AuthModule { }
