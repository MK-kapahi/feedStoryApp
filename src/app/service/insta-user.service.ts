import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { arrayUnion, increment, arrayRemove } from 'firebase/firestore';
import {  Like, LikesModal, Post, PostModal, User } from '../utils/modal';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getAuth } from 'firebase/auth';
import { map, Observable, of, Subject, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConstantData } from '../utils/constant';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class InstaUserService {
  private likesCollection: AngularFirestoreCollection<Like>;
  private postCollection!: AngularFirestoreCollection<Post>;
  private LikedataCollection!: AngularFirestoreCollection<LikesModal>;
  auth = getAuth();
  uid: string = '';
  postId: string = '';
  userDetails = new Subject<DocumentData>
  GetPost = new Subject<DocumentData>
  postType: string = ''

  PostOFAuser = new Subject<DocumentData>
  CommentsSubject = new Subject;
  private uploadProgressSubject = new Subject<any>();
  constructor(private route: Router, public afs: AngularFirestore, public Fireauth: AngularFireAuth, private store: AngularFireStorage, private toaster: ToastrService) { 
    this.likesCollection = this.afs.collection<Like>('Like');
    this.postCollection = this.afs.collection<Post>('postDetail')
    this.LikedataCollection = this.afs.collection<LikesModal>('Likes')
  }
  SetUserData(user: any, data: any) {

    const userData: User = {
      uid: user.uid,
      email: data.email,
      displayName: data.displayName,
      emailVerified: user.emailVerified,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/feedstoryapp-25fc5.appspot.com/o/images.png?alt=media&token=53b38a10-9c8c-466f-87c9-f694e4f1b852"
    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.set(userData, {
      merge: true,
    })


  }

  AllPosts() {
    let items = this.afs.collection('postDetail', ref => {
      return ref.orderBy('createdAt', 'desc')
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => ({
          key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      })
    );

    return items
  }

  getDetails() {
    const uid: any = localStorage.getItem('id');

    let document = this.afs.doc<any>('users/' + uid);
    return document.valueChanges();
  }
  uploadImage(File: any) {
    const filePath = `images/${Date.now()}_${File.name}`;
    const fileRef = this.store.ref(filePath);
    const task = this.store.upload(filePath, File);
    task.percentageChanges()
      .subscribe((percent) => {
        this.uploadProgressSubject.next(percent);
      })
    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .toPromise()
        .then((res: any) => {
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
    const task = this.store.upload(vedioPath, file)
    task.percentageChanges()
      .subscribe((percent) => {
        this.uploadProgressSubject.next(percent);
      })
    return new Promise((resolve, reject) => {

      task
        .snapshotChanges()
        .toPromise()
        .then((res: any) => {
          console.log(res.metadata)
          this.postId = res.metadata.generation;
          this.postType = res.metadata.type;
          storageRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          });
        })
        .catch((error) => reject(error));
    });
  }

  uploadProgressObservable() {
    return this.uploadProgressSubject.asObservable();
  }
  addPost(userId: string, discription: any, url: any, type: number) {
    const id = uuidv4()
    const postdetails: Post =
    {
      postId: id,
      Url: url,
      Type: type,
      createdAt: new Date(),
      Block: false,
      Description: discription,
      isLiked: false,
      likes: 0,
      Comments: 0,
      updateAt: new Date()
    }
    console.log(postdetails)
    const Postdata: PostModal = {
      uid: userId,
      postId: id
    };
    const postRef: AngularFirestoreDocument<any> = this.afs.doc(
      `posts/${id}`
    );

    this.setPostData(postdetails, id)
    return postRef.set(Postdata, {
      merge: true,
    }).then(() => {
      this.toaster.success('image Posted  successfull', " success", {
        titleClass: "center",
        messageClass: "center",
      })
      this.route.navigate([ConstantData.Path.MAIN])
    }).catch((error) => {
      console.log(error)
    })

  }

  setPostData(PostDetails: Post, id: any) {
    const postDetailRef: AngularFirestoreDocument<any> = this.afs.doc(
      `postDetail/${id}`
    );

    return postDetailRef.set(PostDetails, {
      merge: true,
    })
  }
  getPost() {
    const id: any = localStorage.getItem("id")

    this.afs.collection("posts").doc(id).ref.get().then((doc: any) => {
      if (doc.exists) {
        //console.log(doc.data())
        this.GetPost.next(doc.data())
      }
    })
  }


  updateCountOfPost(postid: any, userID: any , name: string) {

  
    let LikeData: LikesModal =
    {
      postId: postid,
      likedUserId: [userID],
      Likedusername : [name]
    }
    console.log(LikeData)
    this.afs.collection("postDetail").doc(postid).update({
      "likes": increment(1)
    })
    this.afs.collection("Likes").doc(postid).set(LikeData).then(() => {
      console.log("done")
    })
  }

  getLikesData(postid: string) {
    return this.afs.doc<any>('Likes/' + postid).valueChanges().pipe(take(1));
  }

  updateData(postid: any, userId: string , like : boolean , name: string) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Likes/${postid}`
    );

    if(like)
    {
    this.afs.collection("postDetail").doc(postid).update({
      "likes": increment(1)
    })
    
    return userRef.update({
      likedUserId: arrayUnion(userId),
      Likedusername :arrayRemove(name)
    })

    }

    else {
      this.afs.collection("postDetail").doc(postid).update({
        "likes": increment(-1)
      })

      return userRef.update({
        likedUserId: arrayRemove(userId),
        Likedusername :arrayRemove(name)
      }).then(() => {
        console.log("removed Sucessfylly")
      })
    }

  }
  getPostDetails() {
    return this.afs.collection('posts').valueChanges().pipe(take(1))
  }

  // dislikePost(postid: any, userId: string) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `Likes/${postid}`
  //   );
  //   this.afs.collection("postDetail").doc(postid).update({
  //     "likes": increment(-1)
  //   })

  //   return userRef.update({
  //     likedUserId: arrayRemove(userId)
  //   }).then(() => {
  //     console.log("removed Sucessfylly")
  //   })
  // }

  getDocumentFromCollection(documentId: string) {
    return this.afs.collection('users').doc(documentId).get();
  }

  blockPost(id: string, report: boolean) {
    if (report) {
      return this.afs.collection("postDetail").doc(id).update({
        "Block": true
      })
    }

    else {
      return this.afs.collection("postDetail").doc(id).update({
        "Block": false
      })
    }
  }
}



