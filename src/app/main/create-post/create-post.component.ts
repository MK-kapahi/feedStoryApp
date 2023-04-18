import { Component } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { map, Observable, of } from 'rxjs';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { ConstantData } from 'src/app/utils/constant';

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
  Type : number = ConstantData.Upload.IMAGE ;
  isEmojiPickerVisible: boolean = false;
  uploadPercent!: Observable<number>;
  constructor(public user : InstaUserService ){

  }
  ngOnInit(): void {
 this.user.getDetails().subscribe((response) => {
      this.User = response;

    });
  }
    PostData()
    {
      this.user.addPost( this.User.uid,this.discriptionMessage,this.URL, this.Type ).then((response)=>{
        console.log(response)
      })
    }

    
    SelectImage(event: any)
    {

      this.FileUpload = event.target.files[0];

      if(this.FileUpload.type==='video/mp4')
      {
        this.user.uploadVideo(this.FileUpload).subscribe();
        this.user.Url.subscribe((res)=>{
          console.log(res);
          this.URL = res;
          this.Type = ConstantData.Upload.VEDIO;
        })
        this.uploadPercent = this.user.uploadProgressObservable().pipe(map((progress: number) => progress))
      }
      else{
        console.log(this.FileUpload)
        this.user.uploadImage(this.FileUpload).subscribe((res:any)=>{})
        this.user.Url.subscribe((res)=>{
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
