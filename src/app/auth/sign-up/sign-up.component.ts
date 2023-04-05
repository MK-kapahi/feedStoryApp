import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireBaseService } from 'src/app/service/fire-base.service';
import { REGEX } from 'src/app/utils/constant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  
  signUpForm!: FormGroup;
  showPassword: boolean =false;
  validateDateOfbirth: boolean =false;
  constructor(private fb : FormBuilder, private fireService : FireBaseService ,private route : Router ,private toaster : ToastrService){
    this.signUpForm = this.fb.group({
      displayName :['',Validators.compose([Validators.required , Validators.pattern(REGEX.USERNAME)])],
      email:['', Validators.compose([Validators.required,Validators.pattern(REGEX.EMAIL)])],
      phoneNumber : ['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required,Validators.pattern(REGEX.PASSWORD)])]
    })
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  Replace(event :any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '')
  }
  RegisterUser() {
   if(this.signUpForm.valid)
   {
    console.log(this.signUpForm.value);
        this.fireService.SignUp(this.signUpForm.value['email'] , this.signUpForm.value['password'], this.signUpForm.value)}
        

   else{
    
      Object.keys(this.signUpForm.controls).forEach(key=>this.signUpForm.controls[key].markAsTouched({onlySelf:true}))
   }
  }

  login()
  {
      this.route.navigate(['login'])
  }
}
