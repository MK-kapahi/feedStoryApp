import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Observable, combineLatest, map } from 'rxjs';
import { PostModal, Post } from '../utils/modal';

@Injectable({
  providedIn: 'root'
})
export class JoinCollectionService {

  private postsCollection!: AngularFirestoreCollection<PostModal>;
  private postDetailCollection: AngularFirestoreCollection<Post> | undefined;
  private usersCollection!: AngularFirestoreCollection<User>;
  commentsWithPostsAndUsers!: Observable<any[]>;

  constructor(private afs: AngularFirestore) {}

     CurrentUserPost()
     {
       this.postsCollection = this.afs.collection<PostModal>('posts');
      this.postDetailCollection = this.afs.collection<Post>('postDetail');
      this.usersCollection = this.afs.collection<User>('users');

      this.commentsWithPostsAndUsers = combineLatest([
      this.postDetailCollection.valueChanges(),
      this.postsCollection.valueChanges(),
      this.usersCollection.valueChanges()
    ]).pipe(
      map(([postDetail, posts, users]) => {
        return postDetail.map(postDetail => {
          const post = posts.find(p => p.postId === postDetail.postId);
          const user = users.find(u => u.uid === post?.uid);
          return {
            ...postDetail,
            photoUrl : user ? user.photoURL : '',
            userName: user ? user.displayName : ''
          };
        });
      })
    );
     }
    }

