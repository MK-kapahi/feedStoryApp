import { Component, Input } from '@angular/core';
import { CommentReplyService } from 'src/app/service/comment-reply.service';
import { JoinCollectionService } from 'src/app/service/join-collection.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  replyText: any;
  @Input() comment: any;
   Postid: any;
  Name !: string;
  isEditing = false;
  repliesShow: boolean = false;
  NestedReply: any = []
  isEmojiPickerVisible : boolean = false;
  constructor( private commentService: CommentReplyService , private join : JoinCollectionService ) {
  }

  id!: string;

  ngOnInit() {  
   }

  replyClick(commentId: any , postId :string , name : string) {
    this.isEditing = !this.isEditing;
    this.id = commentId;
    this.Postid = postId;
    this.Name = name ;
  }

  addReply() {
    console.log( this.Postid)
    console.log(this.Name)

    this.commentService.addReplyToComment(this.id, this.replyText, this.Name , this.Postid );
  }
  showReply(id: any) {
    this.repliesShow = true;
    this.commentService.getNestedReply(id).subscribe((response: any) => {
      for (let reply of response.replies) {
        this.join.NestedComments(reply.commentId)
        this.join.nestedComments.subscribe((response)=>{
         console.log("join nested response", response)
          this.NestedReply.push(...response);
        })
      }
    })

  }

  addEmoji(event: any) {
    const { replyText } = this;
    console.log(`${event.emoji.native}`)
    const text = `${replyText}${event.emoji.native}`;

    this.replyText = text;
    console.log(this.replyText);
    }

    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
