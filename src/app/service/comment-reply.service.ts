import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Reply } from '../utils/modal';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyService {

  private commentsCollection!: AngularFirestoreCollection<Comment>;
  private commentDoc!: AngularFirestoreDocument<Comment>;
  constructor(private afs: AngularFirestore) { }

  addComment(comment: Comment) {
    return this.commentsCollection.add(comment).then(()=>{
      
    });
  }

  // addReplyToComment(commentId: string, reply: Reply) {
  //   const commentRef = this.afs.collection('comments').doc(commentId);
  //   return commentRef.update({ replies: [...comment.replies, reply] });
  // }

  // addReplyToReply(commentId: string, replyId: string, reply: Reply) {
  //   const commentRef = this.afs.collection('comments').doc(commentId);
  //   const replyRef = commentRef.collection('replies').doc(replyId);
  //   return replyRef.update({ comments: [...reply.comments, reply] });
  // }
}
