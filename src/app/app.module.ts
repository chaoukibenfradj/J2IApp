import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';



import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component'

var config = {
  apiKey: "AIzaSyDAE3Hn500kJm7CoDLS_K7nBAmw4cSUMLI",
  authDomain: "isammsummerchallenge.firebaseapp.com",
  databaseURL: "https://isammsummerchallenge.firebaseio.com",
  projectId: "isammsummerchallenge",
  storageBucket: "isammsummerchallenge.appspot.com",
  messagingSenderId: "105238563988"
};

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, 
    ReactiveFormsModule, 
    AngularFireAuthModule
  ],
  providers: [
    AngularFireDatabase, 
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
