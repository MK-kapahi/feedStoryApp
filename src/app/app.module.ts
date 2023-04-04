import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environment';
import { FireBaseService } from './service/fire-base.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MainModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
    }),
    BrowserAnimationsModule
  ],
  providers: [FireBaseService],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
