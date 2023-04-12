import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { DocumentData } from 'firebase/firestore';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommentReplyService } from 'src/app/service/comment-reply.service';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
})
export class ShowPostComponent implements OnInit {
  isLiked: boolean = false;

  currentUserDetails: any = [];
  showComment: boolean = false;
  LikedUserList :Array<string> =[]

  constructor(private user: InstaUserService, private commentsService: CommentReplyService, private afs: AngularFirestore ,private modalService: MdbModalService) {
    this.user.getDetails().subscribe((response)=>{
      this.currentUserDetails = response;
    });
    this.user.AllPosts().subscribe((response)=>{
      this.Posts= response
    });
    this.user.getPostDetails().subscribe((response:any)=>{
      for( let post of response)
      {
      this.user.getLikesData(post.postId).subscribe((response: any) => {
      console.log(response)
      for (let user of response.likedUserId) {
        this.user.getDocumentFromCollection(user).subscribe((document :any) => {
          this.LikedUserList.push(document.data().displayName)
          console.log(this.LikedUserList)
        });
      }
    })
  }
  })
  }

  messageTobeCommented: string = '';
  Posts: any = [];
  Comments: any = [];
  ngOnInit(): void {
    this.commentsService.getComments().subscribe((response)=>{
      this.Comments= response;
      console.log(response)
    });
  }

  onSubmit($event: any, id: any) {
    console.log($event);
    this.messageTobeCommented = $event;
    this.commentsService.addComment(
      this.messageTobeCommented,
      id,
      this.currentUserDetails.displayName
    );

    console.log("Done")
  }
  LikePost(postId: any) {

    this.user.getLikesData(postId).subscribe((response: any) => {
      console.log(!response)
      if (response) {
        if (response.postId === postId) {
          if (response.likedUserId.length > 0) {
            for (let user of response.likedUserId) {
              this.user.getDocumentFromCollection(user).subscribe((document :any) => {
                this.LikedUserList.push(document.data().displayName)
                console.log(this.LikedUserList)
              });
              if (user == this.currentUserDetails.uid) {
                console.log("userAlready liked");
                return ;
              }
              else {
                this.user.updateData(postId, this.currentUserDetails.uid)
                return;
              }
            }
          }
        }
      }

      else {
        this.user.updateCountOfPost(postId, this.currentUserDetails.uid)
      }
    });
  }
  ReportPost(id: string)
  {
     this.user.blockPost(id).then(()=>{
      console.log("done");
     })
    
  }
}
