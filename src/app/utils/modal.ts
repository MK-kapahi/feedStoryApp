export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    phoneNumber : string ;
    emailVerified: boolean;
 }

 export interface Post {
    postId : string;
    Url: string;
    Type : string ;
    createdAt : Date ;
    Archieve : boolean ;
    Description : string ;
    isLiked : boolean;
    likes : number ;
    Comments : string ;
    updateAt : Date;
 }

 export interface PostModal 
 {
    uid : string ;
    postId : string;
 }

 export interface Comment {
   username: string;
   date: Date;
   text: string;
   postId : any;
 }