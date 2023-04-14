
import { Component, OnInit } from '@angular/core';
import { CommentReplyService } from 'src/app/service/comment-reply.service';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { JoinCollectionService } from 'src/app/service/join-collection.service';
import { ConstantData } from 'src/app/utils/constant';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
})
export class ShowPostComponent implements OnInit {
  currentUserDetails: any = [];
  showComment: boolean = false;
  LikedUserList: Array<string> = [];
  showUnlike!: boolean;
  constructor(
    private user: InstaUserService,
    private join: JoinCollectionService,
    private commentsService: CommentReplyService
  ) {
    this.user.getDetails().subscribe((response) => {
      this.currentUserDetails = response;
    });
  }
  messageTobeCommented: string = '';
  Posts: any = [];
  Comments: any = [];
  ngOnInit(): void {
    this.join.AllPost();
    this.join.commentsWithPostsAndUsers.subscribe((response: any) => {
      this.Posts = response;
    });
    this.commentsService.getComments().subscribe((response) => {
      this.Comments = response;
      console.log(response);
    });
  }

  showLike(id: any) {
    let data = []
    for (let post of this.Posts) {
      if (post.postId === id) {
        data = post.Likes.find((user: any) => {
          return user === this.currentUserDetails.uid
        })
      }
    }
    if (data) {
      return true;
    }
    else {

      return false;
    }
  }
  onSubmit($event: any, id: any) {
    console.log($event);
    this.messageTobeCommented = $event;
    this.commentsService.addComment(
      this.messageTobeCommented,
      id,
      this.currentUserDetails.displayName
    );

    console.log('Done');
  }
  LikePost(postId: any, like: boolean) {
    console.log(like)
    if (!like) {
      this.user.getLikesData(postId).subscribe((response: any) => {
        console.log(response);
        if (response) {

          this.user.updateData(postId, this.currentUserDetails.uid, ConstantData.VALUE.TRUE, this.currentUserDetails.displayName).then(() => {
            window.location.reload();
          });
        } else {
          this.user.updateCountOfPost(postId, this.currentUserDetails.uid, this.currentUserDetails.displayName).then(() => {
            window.location.reload();
          });
        }
      });
    } else {
      this.user.updateData(postId, this.currentUserDetails.uid, ConstantData.VALUE.FALSE, this.currentUserDetails.displayName).then(() => {

        window.location.reload();
      });
    }
  }
  ReportPost(id: string) {
    this.user.blockPost(id, ConstantData.VALUE.TRUE).then(() => {
      console.log('done');
    });
  }

  showModal()
  {
    let div = document.getElementsByClassName('modal')[0];
    div.classList.add('show');
  }
}
