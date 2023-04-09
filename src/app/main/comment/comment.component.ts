import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input()
  comment: any;
  isEditing = false;
  constructor() {}

  ngOnInit() {}

  replyClick() {
    this.isEditing = !this.isEditing;
  }

  onAdd(event: any) {
    const value = event; 
    console.log(value);
    if(!this.comment.childComments) {
      this.comment.childComments = [];
    } 
    this.comment.childComments.unshift(value);
     this.isEditing = false;
  }
}
