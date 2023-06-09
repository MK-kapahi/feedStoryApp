import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ConstantData } from '../utils/constant';


const route : Routes = [
  {
    path:"",redirectTo:"login",pathMatch:'full'
  },
  {
    path : ConstantData.Path.SIGNUP , component: SignUpComponent 
  },
  {
    path : ConstantData.Path.LOGIN , component: LoginComponent 
  },
  {
    path : ConstantData.Path.FORGOT , component: ForgotComponent 
  },
  {
    path : 'verify-email-address' , component : VerifyEmailComponent
  }

]
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotComponent,
    VerifyEmailComponent
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
