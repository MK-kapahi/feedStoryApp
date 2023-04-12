export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    emailVerified: boolean;
 }

 export interface Post {
    postId : string;
    Url: any;
    Type : number ;
    createdAt : Date ;
    Block : boolean ;
    Description : string ;
    isLiked : boolean;
    likes : number ;
    Comments : number ;
    updateAt : Date;
    username : string ;
    photoUrlOfUser ?:string;
 }

 export interface PostModal 
 {
    uid : string ;
    postId : any;
 }

 export interface Comment {
   commentId: string;
   username: string;
   date: Date;
   text: string;
   postId ?: any;
   replies ?:Array<any>;
   replyId ?: string
 }

 export interface LikesModal
 {
   postId : any;
   likedUserId :Array<any>
 }