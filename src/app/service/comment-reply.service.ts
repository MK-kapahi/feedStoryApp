import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayUnion, increment } from 'firebase/firestore';
import { Comment } from '../utils/modal';
import { v4 as uuidv4 } from 'uuid';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyService {

  // private commentsCollection!: AngularFirestoreCollection<Comment>;
  // private commentDoc!: AngularFirestoreDocument<Comment>;
  constructor(private afs: AngularFirestore) { }

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
      replies :[]
    }

     this.afs.collection("comments").doc(documentId).set(commentData).then(() => {
      this.afs.collection("postDetail").doc(id).update({
        "Comments" : increment(1)
      })
      console.log("Data successfully written!");
    })  
    .catch((error: any) => {
      console.error("Error writing document: ", error);
    });
   }
    addReplyToComment( commentId : string , message: string  , name : string) {

    console.log(commentId)
    let id = uuidv4()
    let replyData :Comment = 
    {
      commentId: id,
      username: name,
      date: new Date(),
      text: message,
      replies : []
    }
  
    this.afs.collection("comments").doc(id).set(replyData).then(() => {

      this.afs.collection("postDetail").doc(id).update({
        "Comments" : increment(1)
      })
    
      console.log("Data successfully written!");
    })  
    .catch((error: any) => {
      console.error("Error writing document: ", error);
    });

      let commentRef :AngularFirestoreDocument<any> = this.afs.doc(`comments/${commentId}`)

    return commentRef.update({
      replies : arrayUnion(replyData)
       })
  }

  // addReplyToReply(commentId: string, message: string ,replyId: string,name : string) {
  //   let id = uuidv4()
  //   let nestedReplyData :Comment = 
  //   {
  //     commentId: id,
  //     username: name,
  //     date: new Date(),
  //     text: message,
  //     replies : []
  //   }
  
  //   const commentRef = this.afs.collection('comments').doc(commentId);
  //   const replyRef = commentRef.collection('replies').doc(replyId);
  // }

  getNestedReply(postid : any)
  {
    return this.afs.collection('comments').doc(postid).valueChanges();
  }

   getComments() {
    
    return this.afs.collection("comments").valueChanges().pipe(take (1))
    // let data: any = []
    // const querySnapshot = await getDocs(collection(db, "comments"));
    // querySnapshot.forEach((doc) => {
    //   //console.log( doc.data());
    //   data.push(doc.data())
    // });
    // this.CommentsSubject.next(data);
  }
}
