import { Component, OnInit } from '@angular/core';

import { InstaUserService } from 'src/app/service/insta-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  FileUpload!: string | Blob;
  discriptionMessage : string = '';
  constructor(public user : InstaUserService){
    this.user.getDetails()
  }
  ngOnInit(): void {
  }
    PostData()
    {
      console.log(this.FileUpload)
          this.user.uploadImage(this.FileUpload).then((res:any)=>{
            console.log(res)
          })

          this.user.addPost('dddd' ,'kkkk',"gggggg", 4);
    }

    DiscriptionEntered(event: any)
    {
     this.discriptionMessage = event.target.value;
    }
    
    SelectImage(event: any)
    {

      this.FileUpload = event.target.files[0];
    }
}
