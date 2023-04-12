import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from 'src/app/service/fire-base.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(private service :FireBaseService , private route : Router){}
  Home() {
    this.route.navigate(['main'])
  }
  Logout() {
    this.service.SignOut()
  }
  CrestePost() {
    this.route.navigate(['main/home/create-Post'])
  }

  Profile()
  {
    this.route.navigate(['main/home/profile'])
  }
  
  Block()
  {
    this.route.navigate(['main/home/block'])
  }
}
