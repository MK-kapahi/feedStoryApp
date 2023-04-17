import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayUnion, increment } from 'firebase/firestore';
import { Comment } from '../utils/modal';
import { v4 as uuidv4 } from 'uuid';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyService {
  constructor(private afs: AngularFirestore , private toaster : ToastrService) { }

  addComment(message: string , id : any , name : string)
   {

    let documentId = uuidv4()
    let commentData :Comment = 
    {
      commentId:documentId,
      username: name,
      date: new Date(),
      text: message,
      postId: id,
      replies :[],
      parentId : ''
    }
    
    this.afs.collection("postDetail").doc(id).update({
      "Comments" : increment(1)
    })
     this.afs.collection("comments").doc(documentId).set(commentData).then(() => {
      console.log("Data successfully written!");
      this.toaster.success('Comment Successfull added', 'Sucesss',
      {
        titleClass: "center",
        messageClass: "center"
      })
      console.log("Data successfully written!");
    })  
    .catch((error: any) => {
      console.error("Error writing document: ", error);
    });
   }
    addReplyToComment( commentId : string , message: string  , name : string , postId :string) {

    console.log(commentId)
    let id = uuidv4()
    let replyData :Comment = 
    {
      commentId: id,
      username: name,
      date: new Date(),
      text: message,
      replies : [],
      postId: postId,
      parentId : commentId
    }
  
    this.afs.collection("postDetail").doc(postId).update({
      "Comments" : increment(1)
    })
    this.afs.collection("comments").doc(id).set(replyData).then(() => {

      console.log("Data successfully written!");
      this.toaster.success('Comment Successfull added', 'Sucesss',
      {
        titleClass: "center",
        messageClass: "center"
      })
    })  
    .catch((error: any) => {
      console.error("Error writing document: ", error);
    });

      let commentRef :AngularFirestoreDocument<any> = this.afs.doc(`comments/${commentId}`)

    return commentRef.update({
      replies : arrayUnion(replyData)
       })
  }


  getNestedReply(postid : any)
  {
    return this.afs.collection('comments').doc(postid).valueChanges().pipe(take (1));
  }

   getComments() {
    
    return this.afs.collection("comments").valueChanges().pipe(take (1))
    
  }
}
