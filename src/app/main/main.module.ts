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
      }
    ]
  },
 
]

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CreatePostComponent,
    ShowPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
    MatIconModule
  ],
  exports : [RouterModule]
})
export class MainModule { }
