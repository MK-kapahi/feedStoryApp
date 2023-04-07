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
    // const comment: Comment = {
    //   text: "",
    //   username: 'Kevin',
    //   votes: 0,
    //   date: '1 min ago'
    // }  
    // if(!this.comment.comments) {
    //   this.comment.comments = [];
    // } 
    // this.comment.comments.unshift(comment);
    //  this.isEditing = false;
  }
}
