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
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
    MatIconModule,
    FormsModule,
  ],
  exports : [RouterModule]
})
export class MainModule { }
