import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { CommentReplyService } from 'src/app/service/comment-reply.service';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-block-post',
  templateUrl: './block-post.component.html',
  styleUrls: ['./block-post.component.scss']
})
export class BlockPostComponent implements OnInit {

  Posts: any = [];
  showComment :boolean = false;
  Comments : any =[]
  constructor(private user : InstaUserService , private comment : CommentReplyService){
  }
  ngOnInit(): void {
    this.user.AllPosts().subscribe((response)=>{
      this.Posts= response
    });

    this.comment.getComments().subscribe((response)=>{
        this.Comments = response
    })
  }

  unReportPost(id : any)
  {

  }
}
