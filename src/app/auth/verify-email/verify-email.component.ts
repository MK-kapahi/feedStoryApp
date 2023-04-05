import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from 'src/app/service/fire-base.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {

  constructor(public authService : FireBaseService , private route : Router){}
  login()
  {
    this.route.navigate(['login'])
  }
}
