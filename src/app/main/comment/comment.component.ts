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
  @Input()
  comment: any;
  @Input() Postid: any;
  @Input() Name: string = '';
  isEditing = false;
  repliesShow: boolean = false;
  NestedReply: any = []
  isEmojiPickerVisible : boolean = false;
  constructor( private commentService: CommentReplyService , private join : JoinCollectionService ) {
  }

  id: any

  ngOnInit() {  
   }

  replyClick(commentId: any) {
    this.isEditing = !this.isEditing;
    this.id = commentId;
    console.log(commentId)
  }

  addReply() {
    this.commentService.addReplyToComment(this.id, this.replyText, this.Name , this.Postid );
  }
  showReply(id: any) {
    this.repliesShow = true;
    this.commentService.getNestedReply(id).subscribe((response: any) => {
      //console.log(response)
     // console.log(response.replies)
      for (let reply of response.replies) {
        // this.commentService.getNestedReply(reply.commentId).subscribe((nestedReply: any) => {
        //  this.NestedReply.push(nestedReply);
        //  console.log(nestedReply);
        // })
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
