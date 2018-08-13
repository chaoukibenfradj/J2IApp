import { AngularFireAuth } from 'angularfire2/auth';
import { UserCreds } from './../Models/userCredentials';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  errMessage: string = "";
  succMessage: string = "";
  showLoading: boolean = false;

  userCreds = {} as UserCreds;


  signupForm = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });



  constructor(private auth: AngularFireAuth, private afd: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
  }


  public submitSignupForm() {


    console.log(this.signupForm.invalid);


    if (this.signupForm.invalid) {

      this.errMessage = "Inavlid form, please verify your credentials !"

    } else {

      this.showLoading = true;

      this.signupForm.disable();



      this.auth.auth.createUserWithEmailAndPassword(this.userCreds.email, this.userCreds.password).then(
        (authResponse) => {
          console.log(authResponse);
          
          this.userCreds.uid = authResponse.user.uid ; 

          this.afd.list('/user').push(this.userCreds).then(
            (afdResponse) => {
              console.log(afdResponse);

              this.succMessage = "Your account has been created !";
              this.showLoading = false;

              setTimeout(() => {

                this.router.navigate(["/login"]);


              }, 1000);

            }
          );
        }
      ).catch((err: Error) => {
        this.showLoading = false;
        console.log(err);
        this.errMessage = err.message;

      });

    }
  }

}
