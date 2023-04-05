import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getDocs, collection, doc, getDoc, query, where, arrayUnion } from 'firebase/firestore';
import { db } from 'src/environment';
import { Post, PostModal, User } from '../utils/modal';
import { AngularFireStorage  } from '@angular/fire/compat/storage';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class InstaUserService {
  auth = getAuth();
  uid : string = '';
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
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users`
    // );

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id ,'=>', doc.data());
    });
  }

  //   getCurrentUser()
  // {
  //     this.Fireauth.currentUser.then((response:any)=>{
  //       this.uid = response.uid;
  //       console.log(this.uid);
  //       this.getDetails()
  //       console.log("xcvcfbfgb",response);
  //      })

  // }

 async getDetails()
  {
    const uid = localStorage.getItem('id')
      const qureyForCurrentUser = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(qureyForCurrentUser);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
     return  doc.data();
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
          console.log(res)
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          });
        })
        .catch((error) => reject(error));
    });
  }

  addPost( uid : string , discription : any , url : any , type :number )
  {

    const postdetails : Post =
    {
      postId: '',
      Url: '',
      Type: 0,
      createdAt: '',
      Archieve: false,
      description: '',
      isLiked: false,
      likes: 0,
      Comments: '',
      updateAt: ''
    }
    const Postdata : PostModal = {
      uid: uid,
      post : [postdetails]

    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${uid}`
    );
    return userRef.set(Postdata, {
      merge: true,
    })
  }
  }

