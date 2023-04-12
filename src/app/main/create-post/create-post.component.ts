import { Component } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { map, Observable, of } from 'rxjs';
import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {



  FileUpload!: any
  discriptionMessage : string = '';
  User : any =[] 
  URL : any ;
  Posts : any =[]
  Type : number = 1;
  isEmojiPickerVisible: boolean = false;
  message!: string;
  uploadPercent!: Observable<number>;
  constructor(public user : InstaUserService ){
  }
  ngOnInit(): void {
    this.user.getPost();
    this.user.GetPost.subscribe((response)=>{
      this.Posts.push(response)
    })
    this.user.getDetails();
    this.user.userDetails.subscribe((response: DocumentData) => {
      this.User = response;
      console.log(this.User)
    });
  }
    PostData()
    {
      this.user.addPost( this.User.uid,this.discriptionMessage,this.URL, this.Type , this.User.displayName , this.User.photoURL).then((response)=>{
        console.log(response)
      })
    }

    DiscriptionEntered(event: any)
    {
     this.discriptionMessage = event.target.value;
    }
    
    SelectImage(event: any)
    {

      this.FileUpload = event.target.files[0];

      if(this.FileUpload.type==='video/mp4')
      {
        this.user.uploadVideo(this.FileUpload).then((res:any)=>{
          console.log(res);
          this.URL = res;
          this.Type = 2;
        })
        this.uploadPercent = this.user.uploadProgressObservable().pipe(map((progress: number) => progress))
      }
      else{
        console.log(this.FileUpload)
        this.user.uploadImage(this.FileUpload).then((res:any)=>{
          console.log(res);
          this.URL = res;
        })
        this.uploadPercent = this.user.uploadProgressObservable().pipe(map((progress: number) => progress))
      }
    }   

    getProgress(): Observable<number> {
      return this.uploadPercent ? this.uploadPercent.pipe(
        map(progress => {
          if (progress !== undefined && progress !== null) {
            return +progress.toFixed(2);
          } else {
            return 0;
          }
        })
      ) : of(0);
    }

    addEmoji(event: any) {
    const { discriptionMessage } = this;
    console.log(`${event.emoji.native}`)
    const text = `${discriptionMessage}${event.emoji.native}`;

    this.discriptionMessage = text;
    }
       
    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
