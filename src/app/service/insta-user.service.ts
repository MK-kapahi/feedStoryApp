import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { getDocs, collection, doc, getDoc, query, where, arrayUnion, FieldValue, setDoc, orderBy, increment, arrayRemove } from 'firebase/firestore';
import { db } from 'src/environment';
import { Comment, LikesModal, Post, PostModal, User } from '../utils/modal';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getAuth } from 'firebase/auth';
import { Subject } from 'rxjs';
import { docJoin } from './joins';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConstantData } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class InstaUserService {
  auth = getAuth();
  uid: string = '';
  postId: string = '';
  userDetails = new Subject<DocumentData>
  GetPost = new Subject<DocumentData>
  postType: string = ''
  AllPostSubject = new Subject<DocumentData>
  PostOFAuser = new Subject<DocumentData>
  CommentsSubject = new Subject
  constructor(private route: Router, public afs: AngularFirestore, public Fireauth: AngularFireAuth, private store: AngularFireStorage, private toaster: ToastrService) { }
  SetUserData(user: any, data: any) {

    const userData: User = {
      uid: user.uid,
      email: data.email,
      displayName: data.displayName,
      emailVerified: user.emailVerified,
      phoneNumber: data.phoneNumber,
    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.set(userData, {
      merge: true,
    })


  }

  async getUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    });
  }

  async AllPosts() {
    let data: any = []
    const querySnapshot = await getDocs(query(collection(db, "postDetail"), orderBy("createdAt", "desc")));
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    });
    this.AllPostSubject.next(data)

  }

  async getDetails() {
    const uid = localStorage.getItem('id')
    const qureyForCurrentUser = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(qureyForCurrentUser);
    querySnapshot.forEach((doc) => {
      this.userDetails.next(doc.data())
    });
  }
  uploadImage(File: any) {
    const filePath = `images/${Date.now()}_${File.name}`;
    const fileRef = this.store.ref(filePath);
    const task = this.store.upload(filePath, File);

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
  addPost(userId: string, discription: any, url: any, type: number , name : string , photoURL: string) {

    const postdetails: Post =
    {
      postId: this.postId + new Date(),
      Url: url,
      Type: type,
      createdAt: new Date(),
      Archieve: false,
      Description: discription,
      isLiked: false,
      likes: 0,
      Comments: '',
      updateAt: new Date(),
      username: name,
      photoUrlOfUser: photoURL
    }
    const Postdata: PostModal = {
      uid: userId,
      postId: this.postId + new Date()
    };
    const postRef: AngularFirestoreDocument<any> = this.afs.doc(
      `posts/${this.postId + new Date()}`
    );

    this.setPostData(postdetails)
    return postRef.set(Postdata, {
      merge: true,
    }).then(() => {
      this.toaster.success('image Posted  successfull', " success", {
        titleClass: "center",
        messageClass: "center",
      })
      this.route.navigate([ConstantData.Path.MAIN])
    })

  }

  setPostData(PostDetails: Post) {
    const postDetailRef: AngularFirestoreDocument<any> = this.afs.doc(
      `postDetail/${this.postId + new Date()}`
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

  async getComments() {
    let data: any = []
    const querySnapshot = await getDocs(collection(db, "comments"));
    querySnapshot.forEach((doc) => {
      //console.log( doc.data());
      data.push(doc.data())
    });
    this.CommentsSubject.next(data);
  }
  updateCountOfPost(postid: any, userID: unknown) {

    let LikeData: LikesModal =
    {
      postId: postid,
      likedUserId: [userID]
    }
    this.afs.collection("Likes").doc(postid).set(LikeData).then(() => {
      console.log("done")
    })
    this.afs.collection("postDetail").doc(postid).update({
      "likes": increment(1)
    })
  }

  getLikesData(postid: any) {
    return this.afs.collection('Likes').doc(postid).valueChanges();
  }

  updateData(postid: any, userId: string) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Likes/${postid}`
    );

    this.afs.collection("postDetail").doc(postid).update({
      "likes": increment(1)
    })
    this.afs.collection("postDetail").doc(postid).update({
      "isLiked": true
    })
    this.AllPosts()
    return userRef.update({
      likedUserId: arrayUnion(userId)
    })
    // this.afs.collection("postDetail").doc(postid).update({
    //   "likes" : increment(-1)
    // })

    // this.afs.collection("postDetail").doc(postid).update({
    //   "isLiked" : false
    // })
    // return userRef.update({
    //   likedUserId : arrayRemove(userId)
    // }).then(()=>{
    //   console.log("removed Sucessfylly")
    // })

  }

  getPostDetails() {
    return this.afs.collection('posts').valueChanges()
  }

  dislikePost(postid: any, userId: string)
  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Likes/${postid}`
    );
    this.afs.collection("postDetail").doc(postid).update({
      "likes" : increment(-1)
    })

    return userRef.update({
      likedUserId : arrayRemove(userId)
    }).then(()=>{
      console.log("removed Sucessfylly")
    })
  }
  
  getDocumentFromCollection(documentId: string) {
    return this.afs.collection('users').doc(documentId).get();
}
}
