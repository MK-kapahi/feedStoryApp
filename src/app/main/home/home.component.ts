import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';

import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(){
  }
  ngOnInit(): void {
  }
}
