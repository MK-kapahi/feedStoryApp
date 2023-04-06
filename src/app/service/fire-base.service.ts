import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { getDocs, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/environment';
import { InstaUserService } from './insta-user.service';
import { getAuth } from 'firebase/auth';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://localhost:4200/main/login',
  // This must be true.
  handleCodeInApp: true,
};

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  userData : any ;
  authState = getAuth();
  constructor(public auth: AngularFireAuth,private instaUser : InstaUserService , private route : Router , private toaster : ToastrService ,public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

   SignIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(async (result:any) => {
        console.log(result.user)
        if(result.user.emailVerified)
        {
          localStorage.setItem('token',result.user._delegate.accessToken)
          localStorage.setItem('id',result.user.uid)
          this.route.navigate(['main']);
          this.afAuth.authState.subscribe((user) => { });
          const tutorialsRef = doc( db , "users" , result.user.uid)
          await  updateDoc( tutorialsRef , {
            'emailVerified' : result.user.emailVerified
          })
        }

        else
        {
           this.toaster.warning('Please Verify Your Email '," warning",{
            titleClass: "center",
            messageClass: "center",
           })
        }
      })
      .catch((error) => {
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  SignUp(email: string, password: string ,data:any) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
       const user = userCredential.user
       console.log(user)
       this.toaster.success('User Registered Successfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
        this.SendVerificationMail();
        console.log(userCredential);
       this.instaUser.SetUserData(user , data);
      })
      .catch((error) => {
        console.log(error)
        this.toaster.error(error.message,'Error', {
          titleClass: "center",
            messageClass: "center",
        });
      });
  }

  SendVerificationMail() {
    return this.auth.currentUser 
    .then((u: any) => 
    u.sendEmailVerification(actionCodeSettings)).then(  () => {
        this.route.navigate(['verify-email-address']);
        // if (this.auth.currentUser.emailVerified) {
        //     console.log("Email Verified!");
        //     this.route.navigate(['login']);
        // }
      });
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
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.toaster.success('Logout Successfully', 'Sucesss',
          {
            titleClass: "center",
            messageClass: "center"
          })
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      this.route.navigate(['auth']);
    });
  }

}