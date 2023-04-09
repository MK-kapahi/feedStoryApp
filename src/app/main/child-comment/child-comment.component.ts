import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-comment',
  templateUrl: './child-comment.component.html',
  styleUrls: ['./child-comment.component.scss']
})
export class ChildCommentComponent {
  @Input()
  comments!: Comment[];
}