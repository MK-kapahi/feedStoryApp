import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireBaseService } from 'src/app/service/fire-base.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  constructor( private route :Router , private fireService :FireBaseService , private toaster : ToastrService) {}

  onSubmit(data:NgForm)
    {
        let email = data.value.email;
        console.log(email)
      
        this.fireService.ForgotPassword(data.value.email);

        setTimeout(() => {
          
          this.route.navigateByUrl('/login');
        }, 2000);

    }
}
