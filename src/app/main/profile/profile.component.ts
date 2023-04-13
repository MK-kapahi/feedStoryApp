import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { JoinCollectionService } from 'src/app/service/join-collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  CurrentUserPost : any =[]
  User :any =[]
  uid : string =""
  constructor(private user : InstaUserService , private join : JoinCollectionService){
    this.user.getDetails().subscribe((response)=>{
      this.uid=response.uid
      this.User.push(response);
    });
  }
  ngOnInit(): void {
    this.join.UserPost() 
    this.join.currentUserPost.subscribe((response)=>{
      console.log(response);
      this.CurrentUserPost = response
    })
  }


}
