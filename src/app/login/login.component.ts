import { AngularFireAuth } from 'angularfire2/auth';
import { UserCreds } from './../Models/userCredentials';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage : string ;

  showLoading : boolean = false ;


  loginForm =  new FormGroup({
    email: new FormControl('',[ Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  userCreds ={} as UserCreds ;


  constructor(private afd: AngularFireDatabase, private auth : AngularFireAuth) { 


    
  }

  ngOnInit() {

  }

  public submitLoginForm(){


    if(this.loginForm.invalid){
      this.errMessage = "Please verify your credentials !";
    }else{

    this.showLoading = true ;

    this.auth.auth.signInWithEmailAndPassword(this.userCreds.email, this.userCreds.password).then(
      (rep)=>{

        console.log(rep);
        this.showLoading = false ;
        
      }
    ).catch((err:Error)=>{

      this.showLoading = true ;


        console.log(err);
        this.errMessage = err.message ; 
        
      });


    
  }

}
}
