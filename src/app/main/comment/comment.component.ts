import { Component, Input } from '@angular/core';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input()
  comment: any;
  isEditing = false;
  constructor(private user : InstaUserService) {}

  id :any 

  ngOnInit() {}

  replyClick(commentId :any) {
    this.isEditing = !this.isEditing;
    this.id = commentId;
    console.log(commentId)
  }

  onAdd(event: any) {
    const value = event; 
    console.log(value);
    //console.log(!this.comment.childComments)
    if(!this.comment.childComments) {
  console.log("fgfffffffffff")
} 

this.user.addNestedComments(value,"43454","muskan",this.id);
    // this.comment.childComments.unshift(value);
     this.isEditing = false;
  }

  
}
