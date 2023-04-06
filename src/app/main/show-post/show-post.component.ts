import { Component, OnInit } from '@angular/core';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit{



  constructor(private user : InstaUserService){}

  Posts : any =[]
  ngOnInit(): void {
     //this.user.getPost();
     this.user.AllPosts();
     this.user.AllPostSubject.subscribe((response)=>{
      console.log("Allll Post ",response)
      this.Posts.push(response);
     })
  }



}
