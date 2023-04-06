import { Component } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {



  FileUpload!: string | Blob;
  discriptionMessage : string = '';
  User : any =[] 
  URL : any ;
  Posts : any =[]
  constructor(public user : InstaUserService ){
    this.user.getDetails();
    this.user.userDetails.subscribe((response : DocumentData)=>{
      this.User = response
      console.log(this.User);
    })


  }
  ngOnInit(): void {
    this.user.getPost();
    this.user.GetPost.subscribe((response)=>{
         this.Posts.push(response)
         console.log(response);
    })
  }
    PostData()
    {
      if(this.Posts.length != 0)
      {
        this.user.updatePostData( this.User.uid,this.discriptionMessage,this.URL)
      }
      else
      {
      console.log(this.User.uid);
     this.user.addPost( this.User.uid,this.discriptionMessage,this.URL);
      }
    }

    DiscriptionEntered(event: any)
    {
     this.discriptionMessage = event.target.value;
    }
    
    SelectImage(event: any)
    {

      this.FileUpload = event.target.files[0];
      console.log(this.FileUpload)
      this.user.uploadImage(this.FileUpload).then((res:any)=>{
        console.log(res);
        this.URL = res;

      })
    }
       
}