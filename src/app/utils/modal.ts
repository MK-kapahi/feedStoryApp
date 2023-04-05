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
    Type : number ;
    createdAt : string ;
    Archieve : boolean ;
    description : string ;
    isLiked : boolean;
    likes : number ;
    Comments : string ;
    updateAt : string;
 }

 export interface PostModal 
 {
    uid : string ;
    post : Array<Post>
 }