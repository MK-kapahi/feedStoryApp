import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { getDocs, collection, doc, getDoc, query, where, arrayUnion, FieldValue, setDoc } from 'firebase/firestore';
import { db } from 'src/environment';
import { Post, PostModal, User } from '../utils/modal';
import { AngularFireStorage  } from '@angular/fire/compat/storage';
import { getAuth } from 'firebase/auth';
import { Subject } from 'rxjs';

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
  constructor(public afs: AngularFirestore,public Fireauth: AngularFireAuth , private store : AngularFireStorage) { }
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
      console.log(doc.id ,'=>', doc.data());
    });
  }

  async AllPosts()
  {
    const querySnapshot = await getDocs(collection(db, "postDetail"));
    querySnapshot.forEach((doc) => {
      this.AllPostSubject.next(doc.data())
      console.log(doc.id ,'=>', doc.data());
    });
  }

 async getDetails()
  {
    const uid = localStorage.getItem('id')
      const qureyForCurrentUser = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(qureyForCurrentUser);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
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

  addPost( userId : string , discription : any , url : any  )
  {

    const postdetails : Post =
    {
      postId: this.postId+new Date(),
      Url: url,
      Type: this.postType,
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
        console.log(doc.data())
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
  //     Type: this.postType,
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

  }

