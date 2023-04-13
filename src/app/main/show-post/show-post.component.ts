import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { DocumentData } from 'firebase/firestore';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommentReplyService } from 'src/app/service/comment-reply.service';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { JoinCollectionService } from 'src/app/service/join-collection.service';
import { ConstantData } from 'src/app/utils/constant';
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
  LikedUserList: Array<string> = []
  Likes: Array<string> = []
  showUnlike: boolean = false
  constructor(private user: InstaUserService, private join: JoinCollectionService, private commentsService: CommentReplyService, private afs: AngularFirestore, private modalService: MdbModalService) {
    this.user.getDetails().subscribe((response) => {
      this.currentUserDetails = response;
    });

    this.join.AllPost()
    this.join.commentsWithPostsAndUsers.subscribe((response: any) => {
      console.log(response)
      this.Posts = response;
      // for (let post of this.Posts) {
      //   this.onLoad(post.postId)
      // }
    })
  }

  messageTobeCommented: string = '';
  Posts: any = [];
  Comments: any = [];
  ngOnInit(): void {
    this.commentsService.getComments().subscribe((response) => {
      this.Comments = response;
      console.log(response)
    });
  }
  // onLoad(postId: string) {
  //   for (let post of this.Posts) {
  //     console.log("hghjgjh", post)
  //     if (post.postId === postId) {
  //       for (let like of post.Likes) {
  //         if (like === this.currentUserDetails.uid) {
  //           this.showUnlike = true;
  //         }
  //         else {
  //           this.showUnlike = false;
  //         }
  //       }
  //     }
  //   }
  // }
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
  ReportPost(id: string) {
    this.user.blockPost(id, ConstantData.VALUE.Report).then(() => {
      console.log("done");
    })
  }
}