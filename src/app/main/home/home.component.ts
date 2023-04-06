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

  FileUpload!: string | Blob;
  discriptionMessage : string = '';
  User : any =[] 
  URL : any ;
  Posts : any =[]
  constructor(public user : InstaUserService ){
    this.user.getDetails();
    this.user.userDetails.subscribe((response : DocumentData)=>{
      this.User = response
    })

  }
  ngOnInit(): void {
    this.user.getPost();
    this.user.GetPost.subscribe((response)=>{
         this.Posts.push(response)
         console.log(response);
    })
  }
    // PostData()
    // {
    //   if(this.Posts.length === 0)
    //   {
    //     this.user.addPost( this.User.uid,this.discriptionMessage,this.URL);
    //   }
      
    //   else
    //   {
    //     this.user.updatePostData( this.User.uid,this.discriptionMessage,this.URL)
    //   console.log(this.User.uid);
    //   }
    // }

    // DiscriptionEntered(event: any)
    // {
    //  this.discriptionMessage = event.target.value;
    // }
    
    // SelectImage(event: any)
    // {

    //   this.FileUpload = event.target.files[0];
    //   console.log(this.FileUpload)
    //   this.user.uploadImage(this.FileUpload).then((res:any)=>{
    //     console.log(res);
    //     this.URL = res;

    //   })
    // }
}
