import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstaUserService } from 'src/app/service/insta-user.service';
import { JoinCollectionService } from 'src/app/service/join-collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  CurrentUserPost: any = []
  User: any = []
  uid: string = "";
  Image = "";
  Bio :string= "";
visible: Boolean = false;
isEmojiPickerVisible: boolean = false;
  constructor(private user: InstaUserService, private join: JoinCollectionService , private route : Router) {
    this.user.getDetails().subscribe((response) => {
      this.uid = response.uid
      this.User.push(response);
      console.log(this.User)
    });
  }
  ngOnInit(): void {
    this.join.UserPost()
    this.join.currentUserPost.subscribe((response) => {
      console.log(response);
      this.CurrentUserPost = response
    })
  }

  uploadProfileImage(event :any)
  {
    let file = event.target.files[0];
    console.log(file);
    this.user.uploadImage(file).subscribe((res:any)=>{
  })
  this.user.Url.subscribe((response)=>{
    this.Image= response
  })
}

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
    let div = document.getElementsByClassName('modal')[0];
    div.classList.add('show');
  
  }
  closePopup() {
    let div = document.getElementsByClassName('modal')[0];
    div.classList.remove('show');
    this.displayStyle = "none";
  }

  saveChanges(uid :string)
  {
    this.user.updateProfile(uid ,this.Image, this.Bio).then(()=>{
      this.route.navigate(["main/home"])
    })
    let div = document.getElementsByClassName('modal')[0];
    div.classList.remove('show');
    this.displayStyle = "none";
  }

  addEmoji(event: any) {
    console.log(`${event.emoji.native}`)
    const text = `${this.Bio}${event.emoji.native}`;

    this.Bio = text;
    }
       
    onFocus() {
      this.isEmojiPickerVisible = false;
    }
}
