import { Component } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {



  FileUpload!: any
  discriptionMessage : string = '';
  User : any =[] 
  URL : any ;
  Posts : any =[]
  Type : number = 1
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
  
      this.user.addPost( this.User.uid,this.discriptionMessage,this.URL, this.Type).then((response)=>{
        console.log(response)
      })
    }

    DiscriptionEntered(event: any)
    {
     this.discriptionMessage = event.target.value;
    }
    
    SelectImage(event: any)
    {

      this.FileUpload = event.target.files[0];

      if(this.FileUpload.type==='video/mp4')
      {
        this.user.uploadVideo(this.FileUpload).then((res:any)=>{
          console.log(res);
          this.URL = res;
          this.Type = 2;
        })
        }
        else{
        console.log(this.FileUpload)
        this.user.uploadImage(this.FileUpload).then((res:any)=>{
          console.log(res);
          this.URL = res;
        })
        this.Type = 1;
        }
    }
       
}
