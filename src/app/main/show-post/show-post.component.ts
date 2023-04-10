import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { Comment } from 'src/app/utils/modal';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
})
export class ShowPostComponent implements OnInit {
  isLiked: boolean = false;

  currentUserDetails: any = [];
  showComment: boolean = false;

  constructor(private user: InstaUserService, private client: HttpClient) {}

  clickCount: number = 0;
  messageTobeCommented: string = '';
  Posts: any = [];
  Comments: any = [];
  ngOnInit(): void {
    this.user.getDetails();
    this.user.userDetails.subscribe((response: DocumentData) => {
      this.currentUserDetails = response;
    });

    this.user.AllPosts();
    this.user.AllPostSubject.subscribe((response) => {
      //console.log("Allll Post ",response)
      this.Posts.push(response);
    });
    this.user.PostOFAuser.subscribe((userResponse) => {
      //console.log("sadsfsdfsf",userResponse)
    });
    this.user.getComments();
    this.user.CommentsSubject.subscribe((response) => {
      this.Comments = response;
      console.log(this.Comments);
    });
  }

  commentAdded(comment: Comment) {
    comment.replies = [];
    this.Comments.push(comment);
  }

  onSubmit($event: any, id: any) {
    console.log($event);
    this.messageTobeCommented = $event;
    this.user.addComment(
      this.messageTobeCommented,
      id,
      this.currentUserDetails.displayName
    );
  }
  addComment(id: any) {}
  LikePost(postId: any) {
    this.user.getLikesData().subscribe((response: any) => {
      console.log(response);

      if (response.postID == postId) {
        if (response.likedUserId.length != 0) {
          for (let user of response.likedUserId) {
            if (user != this.currentUserDetails.uid) {
               this.user.updateData(postId , this.currentUserDetails.uid);

            }
          }
        }

        else{
          this.user.updateCountOfPost(postId , this.currentUserDetails.uid)
        }
        
      }
    });
    this.clickCount++;
    // if(this.clickCount ===1)
    // {
    // console.log('heyyyyyy')
    // this.isLiked=true;
    // this.user.updateCountOfPost(postId , this.currentUserDetails.uid)
    // }

    // else
    // {
    //   ///this.user.updateCountOfPost(postId)
    //   this.isLiked=false;
    // }
  }
}
