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
    this.user.getDetails();
    this.user.userDetails.subscribe((response: DocumentData) => {
      this.currentUserDetails = response;
    });
    this.user.AllPosts();
    this.user.AllPostSubject.subscribe((response) => {
      this.Posts = response;
    });
  }

  messageTobeCommented: string = '';
  Posts: any = [];
  Comments: any = [];
  ngOnInit(): void {

    this.user.PostOFAuser.subscribe((userResponse) => {
    });
    this.user.getComments();
    this.user.CommentsSubject.subscribe((response) => {
      this.Comments = response;
      console.log(this.Comments);
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
    this.user.getComments();
    this.user.CommentsSubject.subscribe((response) => {
      this.Comments = response;
      console.log(this.Comments);
    });
  }
  LikePost(postId: any) {

    this.user.getLikesData(postId).subscribe((response: any) => {
      console.log(response)
      if (response) {
        if (response.postId === postId) {
          if (response.likedUserId.length > 0) {
            for (let user of response.likedUserId) {
              if (user == this.currentUserDetails.uid) {
                console.log("userAlready liked");
              }
              else {
                this.user.updateData(postId, this.currentUserDetails.uid)
                return;
              }
                this.user.getDocumentFromCollection(user).subscribe((document :any) => {
                  this.LikedUserList.push(document.data().displayName)
                  console.log(this.LikedUserList)
                });
            }
          }
        }
      }

      else {
        this.user.updateCountOfPost(postId, this.currentUserDetails.uid)
      }
    });

    this.user.AllPosts();
    this.user.AllPostSubject.subscribe((response) => {
      this.Posts = response;
    });
  }

  ShowListofUsers(postId: any) {
    // this.user.getLikesData(postId).subscribe((response: any) => {
    //   console.log(response)
    //   for (let user of response.likedUserId) {
    //     this.user.getDocumentFromCollection(user).subscribe((document :any) => {
    //       this.LikedUserList.push(document.data().displayName)
    //       console.log(this.LikedUserList)
    //     });
    //   }
    // })
  }
}
