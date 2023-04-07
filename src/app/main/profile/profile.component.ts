import { Component } from '@angular/core';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private user : InstaUserService){
    // this.user.joinCollection().subscribe((response)=>{
    //   console.log(response);
    // })
  }
}
