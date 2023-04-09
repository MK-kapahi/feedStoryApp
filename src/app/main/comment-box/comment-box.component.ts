import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/utils/modal';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent {
  value!: string;
  @Output() add = new EventEmitter<string>();
  @Input()
  postId!: string;
  post() {
    if (this.value.trim()) {
      console.log(this.value)
      this.add.emit(this.value);
      this.value = '';
    } 
  }
}
