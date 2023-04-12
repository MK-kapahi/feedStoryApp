import { Component } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { JoinCollectionService } from 'src/app/service/join-collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  CurrentUserPost : any =[]
  User :any =[]
  constructor(private user : InstaUserService , private join : JoinCollectionService){
    this.user.getDetails();
    this.user.userDetails.subscribe((response :any)=>{
      console.log(response)
      // this.User.push(response);
    })
    this.join.CurrentUserPost() 
    this.join.commentsWithPostsAndUsers.subscribe((response)=>{
      console.log(response);
      this.CurrentUserPost = response
    })
  }
}
