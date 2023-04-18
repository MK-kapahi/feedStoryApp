import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {  RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatIconModule } from '@angular/material/icon';
import { ShowPostComponent } from './show-post/show-post.component';
import { CommentComponent } from './comment/comment.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ConstantData } from '../utils/constant';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BlockPostComponent } from './block-post/block-post.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu'
const route : Routes = [
  {
    path:"",redirectTo:ConstantData.Path.HOME,pathMatch:'full'
  },
  {
    path : ConstantData.Path.HOME , component: HomeComponent , children:[
      {
        path:"",redirectTo:ConstantData.Path.SHAREPOST ,pathMatch:'full'
      },
      {
        path : ConstantData.Path.SHAREPOST , component : ShowPostComponent , 
      },
      {
        path : ConstantData.Path.CREATEPOST , component : CreatePostComponent ,
      },
      {
        path : ConstantData.Path.PROFILE , component : ProfileComponent ,
      },
      {
        path : ConstantData.Path.BLOCK , component : BlockPostComponent
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
    BlockPostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
    MatIconModule,
    FormsModule,
    PickerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule
  ],
  exports : [RouterModule]
})
export class MainModule { }
