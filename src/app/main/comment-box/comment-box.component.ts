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
  @Output() add = new EventEmitter<string>();
  commentText = '';
 isEmojiPickerVisible: boolean= false;
  onSubmit(): void {
    
    let text= this.commentText.trim();
    this.add.emit(text);
    this.commentText = '';
    
  }

  addEmoji(event: any) {
    const text = `${this.commentText}${event.emoji.native}`;

    this.commentText = text;
    }

    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
