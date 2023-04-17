import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Observable, combineLatest, map, take, ObservableInput } from 'rxjs';
import { PostModal, Post, LikesModal, Comment } from '../utils/modal';

@Injectable({
  providedIn: 'root'
})
export class JoinCollectionService {

  private postsCollection!: AngularFirestoreCollection<PostModal>;
  private postDetailCollection: AngularFirestoreCollection<Post> | undefined;
  private usersCollection!: AngularFirestoreCollection<User>;
  private LikedCollection !: AngularFirestoreCollection<LikesModal>;
  private CommentsCollection !: AngularFirestoreCollection<Comment>;
  commentsWithPostsAndUsers!: Observable<any[]>;
  currentUserPost !: Observable<any[]>;
  Comments !: Observable<any[]>;
  nestedComments !: Observable<any[]>
  constructor(private afs: AngularFirestore) { }

  AllPost() {
    this.postsCollection = this.afs.collection<PostModal>('posts');
    this.postDetailCollection = this.afs.collection<Post>('postDetail');
    this.usersCollection = this.afs.collection<User>('users');
    this.LikedCollection = this.afs.collection<LikesModal>('Likes');

    this.commentsWithPostsAndUsers = combineLatest([
      this.postDetailCollection.valueChanges(),
      this.postsCollection.valueChanges().pipe(take(1)),
      this.usersCollection.valueChanges().pipe(take(1)),
      this.LikedCollection.valueChanges().pipe(take(1)),
    ]).pipe(
      map(([postDetail, posts, users, likes]) => {
        return postDetail.map(postDetail => {
          const post = posts.find(p => p.postId === postDetail.postId);
          const user = users.find(u => u.uid === post?.uid);
          const Like = likes.find(l => l.postId === post?.postId)
          return {
            ...postDetail,
            photoUrl: user ? user.photoURL : '',
            userName: user ? user.displayName : '',
            Likes: Like ? Like.likedUserId : [],
            Names: Like ? Like.Likedusername : [],
          };
        });
      })
    );
  }

  UserPost() {
    let uid: any = localStorage.getItem('id')
    console.log(uid)
    this.postsCollection = this.afs.collection<PostModal>('posts', ref => ref.where('uid', '==', uid));
    this.postsCollection.valueChanges().subscribe((res) => {
      console.log(res)
    })
    this.postDetailCollection = this.afs.collection<Post>('postDetail');
    this.usersCollection = this.afs.collection<User>(`users`);

    this.currentUserPost = combineLatest([
      this.postDetailCollection.valueChanges().pipe(take(1)),
      this.postsCollection.valueChanges().pipe(take(1)),
      this.usersCollection.valueChanges().pipe(take(1))
    ]).pipe(
      map(([postDetail, posts, users]) => {
        return posts.map(post => {
          const posts = postDetail.find(p => p.postId === post.postId);
          const user = users.find(u => u.uid === post?.uid);
          return {
            photoUrl: user ? user.photoURL : '',
            userName: user ? user.displayName : '',
            uid: user ? user.uid : '',
            ...posts
          };
        });
      })
    );
  }

  allComments() {
    this.postsCollection = this.afs.collection<PostModal>('posts');
    this.usersCollection = this.afs.collection<User>('users');
    this.CommentsCollection = this.afs.collection<Comment>('comments', ref => ref.orderBy('date', 'desc'))

    this.Comments = combineLatest([
      this.CommentsCollection.valueChanges().pipe(take(1)),
      this.postsCollection.valueChanges().pipe(take(1)),
      this.usersCollection.valueChanges().pipe(take(1))
    ]).pipe(
      map(([comment, posts, users]) => {
        return comment.map((comment: any) => {
          const post = posts.find(p => p.postId === comment.postId);
          const user = users.find(u => u.uid === post?.uid);
          return {
            ...comment,
            photoUrl: user ? user.photoURL : '',
            Name: user ? user.displayName : '',
            uid: user ? user.uid : '',
          };
        });
      })
    );
  }

  NestedComments(id: any) {
    this.postsCollection = this.afs.collection<PostModal>('posts');
    this.usersCollection = this.afs.collection<User>('users');
    let commentCollwithDoc = this.afs.doc('comments/' + id);
    const comment$ = commentCollwithDoc.valueChanges().pipe(
      map((comment: any) => {
        return [comment].reduce((acc: any, comment: any) => {
          acc[comment.commentId] = comment;
          return Object.values(acc)
        }, []);
      }, (take(1)))
    )

    this.nestedComments = combineLatest([this.usersCollection.valueChanges().pipe(take(1)), this.postsCollection.valueChanges().pipe(take(1)), comment$]).pipe(
      map(([users, post, nested,]) => {
        return nested.map((nestedCommment: any) => {
          console.log(nestedCommment.postId)
          const posts = post.find(p => p.postId === nestedCommment.postId);
          console.log(posts)
          const user = users.find(u => u.uid === posts?.uid);
          return {
            ...nestedCommment,
            photoUrl: user ? user.photoURL : '',
            Name: user ? user.displayName : '',
            uid: user ? user.uid : '',
          };
        })
      }, take(1))
    );

  }

}


