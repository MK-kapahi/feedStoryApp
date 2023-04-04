import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { User } from '../utils/modal';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  userData : any ;
  constructor(public auth: AngularFireAuth , private route : Router , private toaster : ToastrService ,public afAuth: AngularFireAuth ,public afs: AngularFirestore) { }

  SignIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        console.log(result.user._delegate)
        localStorage.setItem('token',result.user._delegate.accessToken)
        this.route.navigate(['home']);
      })
      .catch((error) => {
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  SignUp(email: string, password: string ) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.SendVerificationMail();
       this.SetUserData(result.user);
      })
      .catch((error) => {
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  SendVerificationMail() {
    return this.auth.currentUser
      .then((u: any) => u.sendEmailVerification())
  }

  signInusingObject(userCredential : any)
  {
    return this.auth.signInWithCredential(userCredential).then((result)=>{
      console.log(result);
    })
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then((result) => {
        console.log(result);
        this.toaster.info('Password reset email sent, check your inbox.', 'Sucesss',
              {
                titleClass: "center",
                messageClass: "center"
              })
      })
      .catch((error) => {
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  isLoggedIn(): boolean {
    return !localStorage.getItem('token')
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.route.navigate(['sign-in']);
    });
}
}