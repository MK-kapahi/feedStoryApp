import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { getDocs, collection, doc, getDoc, query, where, arrayUnion, FieldValue, setDoc, orderBy, increment } from 'firebase/firestore';
import { db } from 'src/environment';
import { Comment, LikesModal, Post, PostModal, User } from '../utils/modal';
import { AngularFireStorage  } from '@angular/fire/compat/storage';
import { getAuth } from 'firebase/auth';
import { Subject } from 'rxjs';
import { docJoin } from './joins';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstaUserService {
  auth = getAuth();
  uid : string = '';
  postId:string = '';
  userDetails = new Subject<DocumentData>
  GetPost = new Subject<DocumentData>
  postType : string =''
  AllPostSubject = new Subject<DocumentData>
  PostOFAuser = new Subject<DocumentData> 
  CommentsSubject = new Subject
  constructor(private route : Router,public afs: AngularFirestore,public Fireauth: AngularFireAuth , private store : AngularFireStorage , private  toaster : ToastrService ) { }
  SetUserData(user: any, data: any) {

    const userData: User = {
      uid: user.uid,
      email: data.email,
      displayName: data.displayName,
      emailVerified: user.emailVerified,
      phoneNumber: data.phoneNumber,
    };
      // this.client.httpPost(ConstantData.Api.user , userData).subscribe((response)=>{
      //   console.log(response)
      // })
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.set(userData, {
      merge: true,
    })
   

  }

  async getUsers() 
  {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
     // console.log(doc.id ,'=>', doc.data());
    });
  }

  async AllPosts()
  {
    let data: DocumentData
    const querySnapshot = await getDocs( query(collection(db, "postDetail"), orderBy("createdAt", "desc")));
    console.log(querySnapshot)
    querySnapshot.forEach(async (doc) => {
      this.AllPostSubject.next(doc.data())
   });      

  }

 async getDetails()
  {
    const uid = localStorage.getItem('id')
      const qureyForCurrentUser = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(qureyForCurrentUser);
      querySnapshot.forEach((doc) => {
        //console.log(doc.data())
         this.userDetails.next(doc.data())
   });
  }
  uploadImage(File : any)
  {
    const filePath = `images/${Date.now()}_${File.name}`;
    const fileRef = this.store.ref(filePath);
    const task = this.store.upload(filePath, File);

    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .toPromise()
        .then((res:any) => {
          console.log(res.metadata)
          this.postId = res.metadata.generation;
          this.postType = res.metadata.type;
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          });
        })
        .catch((error) => reject(error));
    });
  }

  uploadVideo(file: any) {
    const vedioPath = `videos/${Date.now()}_${file.name}`;
    const storageRef = this.store.ref(vedioPath);
   // const videoRef = storageRef.child(`videos/${file.name}`);
   // const task = videoRef.put(file);
   const task = this.store.upload(vedioPath,file)
   return new Promise((resolve, reject) => {
    task
      .snapshotChanges()
      .toPromise()
      .then((res:any) => {
        console.log(res.metadata)
        this.postId = res.metadata.generation;
        this.postType = res.metadata.type;
        storageRef.getDownloadURL().subscribe((url) => {
          resolve(url);
        });
      })
      .catch((error) => reject(error));
  });
    // task.then(snapshot => {
    //   const downloadURL = snapshot.downloadURL;
    // });
  }
  addPost( userId : string , discription : any , url : any ,type : number )
  {

    const postdetails : Post =
    {
      postId: this.postId+new Date(),
      Url: url,
      Type: type,
      createdAt: new Date(),
      Archieve: false,
      Description: discription,
      isLiked: false,
      likes: 0,
      Comments: '',
      updateAt: new Date()
    }
    const Postdata : PostModal = {
      uid: userId,
      postId  :  this.postId+new Date()
    };
    const postRef : AngularFirestoreDocument<any> = this.afs.doc(
      `posts/${this.postId+new Date()}`
    );
     
    this.setPostData(postdetails)
    return postRef.set(Postdata, {
      merge: true,
    }).then(()=>{
      this.toaster.success('image Posted  successfull'," success",{
        titleClass: "center",
        messageClass: "center",
       })
       this.route.navigate(['main/home'])
    })

  }

  setPostData(PostDetails :Post)
  {
    const postDetailRef : AngularFirestoreDocument<any> = this.afs.doc(
      `postDetail/${this.postId+new Date()}`
      );

      return postDetailRef.set(PostDetails, {
        merge: true,
      })
  }
   getPost()
  {
     const id :any = localStorage.getItem("id")
  
     this.afs.collection("posts").doc(id).ref.get().then((doc : any)=>{
      if(doc.exists)
      {
        //console.log(doc.data())
        this.GetPost.next(doc.data())
      }
    })
  }
   
  // updatePostData( userId : string , discription : any , url : any )
  // {

  //   const postdetails : Post =
  //   {
  //     postId: this.postId+new Date().toString(),
  //     Url: url,
  //     createdAt: new Date(),
  //     Archieve: false,
  //     Description: discription,
  //     isLiked: false,
  //     likes: 0,
  //     Comments: '',
  //     updateAt: new Date()
  //   }
  //   // const Postdata : PostModal = {
  //   //   uid: userId,
  //   //   post : [postdetails]
  //   // };
  //   // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //   //   `posts/${userId}`
  //   // );
  //   // return userRef.update({
  //   //    post : arrayUnion(postdetails)
  //   // })
  
  // }

  joinCollection(id:any)
  {
   let user = this.afs.doc(`posts`).valueChanges().pipe(
    docJoin(this.afs , { postId : 'postDetails' })
   )

   return user;
  }


   addComment(message: string , id : any , name : string, replyid?: any)
   {

       let comment :Comment ={
         username: name,
         date: new Date(),
         text: message,
         postId: id,
         commentId: new Date().getTime().toString()
       }
       let commentRef :AngularFirestoreDocument<any> = this.afs.doc(`comments/${new Date().getTime().toString()}`)

      //  return commentRef.set(comment, {
      //   merge: true,
      // }).then((response)=>{
      //   console.log(response);
      // })

     this.afs.collection("comments").doc(new Date().getTime().toString()).set(comment).then(() => {
      
      console.log("Data successfully written!");
    })  
    .catch((error: any) => {
      console.error("Error writing document: ", error);
    });
    this.getComments()
   }

   async getComments()
   {
    let data:any =[] 
    const querySnapshot = await getDocs(collection(db, "comments"));
     querySnapshot.forEach((doc) => {
      //console.log( doc.data());
      data.push(doc.data())
    }); 
    this.CommentsSubject.next(data);
  }

  addNestedComments(message: string , id : any , name : string , commentId : any)
  {

      let comment :Comment ={
        username: name,
        date: new Date(),
        text: message,
        postId: id,
        commentId: new Date().getTime().toString(),
      }
      let commentRef :AngularFirestoreDocument<any> = this.afs.doc(`comments/${commentId}`)

      return commentRef.update({
        childComments : arrayUnion(comment)
         })
     //  return commentRef.set(comment, {
     //   merge: true,
     // }).then((response)=>{
     //   console.log(response);
     // })

  //   this.afs.collection("comments").doc(new Date().getTime().toString()).set(comment).then(() => {
     
  //    console.log("Data successfully written!");
  //  })  
  //  .catch((error: any) => {
  //    console.error("Error writing document: ", error);
  //  });
  }

  updateCountOfPost(postid :any ,userID: unknown)
  {

    let LikeData : LikesModal =
    {
      postId: postid,
      likedUserId :  [arrayUnion(userID)]
    }
    this.afs.collection("Likes").doc(new Date().getTime().toString()).set(LikeData).then(()=>{
      console.log("done")
    })
     this.afs.collection("postDetail").doc(postid).update({
      "likes" : increment(1)
     })
  }

  getLikesData()
  {
   
    return this.afs.collection('Likes').valueChanges();
  }
  }

