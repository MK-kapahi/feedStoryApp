import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Observable, combineLatest, map, take } from 'rxjs';
import { PostModal, Post, LikesModal } from '../utils/modal';

@Injectable({
  providedIn: 'root'
})
export class JoinCollectionService {
  
  private postsCollection!: AngularFirestoreCollection<PostModal>;
  private postDetailCollection: AngularFirestoreCollection<Post> | undefined;
  private usersCollection!: AngularFirestoreCollection<User>;
  private LikedCollection !: AngularFirestoreCollection<LikesModal>;
  commentsWithPostsAndUsers!: Observable<any[]>;
  currentUserPost !:Observable<any[]>;

  constructor(private afs: AngularFirestore) {}

  AllPost()
  {
       this.postsCollection = this.afs.collection<PostModal>('posts');
       this.postDetailCollection = this.afs.collection<Post>('postDetail');
       this.usersCollection = this.afs.collection<User>('users');
       this.LikedCollection = this.afs.collection<LikesModal>('Likes');

      this.commentsWithPostsAndUsers = combineLatest([
      this.postDetailCollection.valueChanges(),
      this.postsCollection.valueChanges().pipe(take (1)),
      this.usersCollection.valueChanges().pipe(take (1)),
      this.LikedCollection.valueChanges().pipe(take (1)),
    ]).pipe(
      map(([postDetail, posts, users , likes]) => {
        return postDetail.map(postDetail => {
          const post = posts.find(p => p.postId === postDetail.postId);
          const user = users.find(u => u.uid === post?.uid);
          const Like = likes.find(l => l.postId === post?.postId)
          return {
            ...postDetail,
            photoUrl : user ? user.photoURL : '',
            userName: user ? user.displayName : '',
            Likes : Like? Like.likedUserId :[],
            Names : Like? Like.Likedusername :[] ,
          };
        });
      })
    );
     }

     UserPost()
     {
      this.postsCollection = this.afs.collection<PostModal>('posts');
      this.postDetailCollection = this.afs.collection<Post>('postDetail');
      this.usersCollection = this.afs.collection<User>('users');

      this.currentUserPost = combineLatest([
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
              userName: user ? user.displayName : '',
              uid : user ? user.uid :'',
            };
          });
        })
      );
     }
    }

