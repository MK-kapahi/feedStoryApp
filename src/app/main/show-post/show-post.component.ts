import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit{
  
  
  currentUserDetails: any =[]
  constructor(private user : InstaUserService){}
  messageTobeCommented : string =''
  Posts : any =[];
  Comments : any=[];
  ngOnInit(): void {
    this.user.getDetails();
    this.user.userDetails.subscribe((response : DocumentData)=>{
      this.currentUserDetails = response
    })
     this.user.AllPosts();
     this.user.AllPostSubject.subscribe((response)=>{
       //console.log("Allll Post ",response)
       this.Posts.push(response);
      })
      this.user.PostOFAuser.subscribe((userResponse)=>{
        //console.log("sadsfsdfsf",userResponse)
      })
      this.user.getComments()
      this.user.CommentsSubject.subscribe((response )=>{
        this.Comments = response
        console.log(this.Comments);
      })
  }
  
  
  onSubmit($event: any) {
    console.log($event)
    this.messageTobeCommented= $event;
    // this.user.addComment($event);
  }
  addComment(id : any) {
    this.user.addComment(this.messageTobeCommented , id , this.currentUserDetails.displayName);
  }
}
