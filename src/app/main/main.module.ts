import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {  RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGaurdService } from '../utils/gaurds/auth-gaurd.service';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatIconModule } from '@angular/material/icon';
import { ShowPostComponent } from './show-post/show-post.component';
import { CommentComponent } from './comment/comment.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { FormsModule } from '@angular/forms';
import { ChildCommentComponent } from './child-comment/child-comment.component';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';


const route : Routes = [
  {
    path:"",redirectTo:"home",pathMatch:'full'
  },
  {
    path : 'home' , component: HomeComponent , children:[
      {
        path:"",redirectTo:"show-Post" ,pathMatch:'full'
      },
      {
        path : 'show-Post' , component : ShowPostComponent , 
      },
      {
        path : 'create-Post' , component : CreatePostComponent ,
      },
      {
        path : 'profile' , component : ProfileComponent ,
      }
    ]
  },
 
]

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CreatePostComponent,
    ShowPostComponent,
    CommentComponent,
    CommentBoxComponent,
    ChildCommentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
    MatIconModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  exports : [RouterModule]
})
export class MainModule { }
