import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { NgxSpinnerService } from 'ngx-spinner';

import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


 loading :boolean = true ;
  constructor(private spinnerService: NgxSpinnerService) {
  }
  ngOnInit(): void {
    // Start spinner 
    this.spinnerService.show();


    setTimeout(() => {
      // Hide the spinner and show the content
      this.spinnerService.hide();
      this.loading = false;
    }, 3000);
  }
}
