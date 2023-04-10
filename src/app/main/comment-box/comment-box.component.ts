import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/utils/modal';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent {
  value!: string;
  @Output() add = new EventEmitter<Comment>();
  @Input()
  postId!: string;

  @Output() commentAdded = new EventEmitter<Comment>();
  commentText = '';
  onSubmit(): void {
    const comment: Comment = {
      commentId: uuid(),
      text: this.commentText.trim(),
      username: 'Anonymous',
      date: new Date(),
      postId: "",

    };
    this.commentAdded.emit(comment);
    this.commentText = '';
  }
}
