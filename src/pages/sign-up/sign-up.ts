// importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  //defining necessary varibles
  //formControlNames
  signUpForm: FormGroup;
  signUpName: AbstractControl;
  signUpEmail: AbstractControl;
  signUpPassword: AbstractControl;

  //ngModelNames
  ngName: any;
  ngEmail: any;
  ngPassword: any;
  data: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private storage: Storage, public http:Http) {
    
    this.signUpForm = formBuilder.group({
      signUpName: ['', Validators.compose([Validators.required])],
      signUpEmail: ['', Validators.compose([Validators.required, Validators.email])],
      signUpPassword:['',Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.signUpName = this.signUpForm.controls['signUpName'];
    this.signUpEmail = this.signUpForm.controls['signUpEmail'];
    this.signUpPassword=this.signUpForm.controls['signUpPassword']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  //function to save and send data to server on pressing signUp button
  submit() {
    let userData = {
      'uname': this.ngName,
      'uemail': this.ngEmail,
      'upassword': this.ngPassword
    };
    let body = {
      name: this.ngName,
      email: this.ngEmail,
      password: this.ngPassword
    };
    this.http.post('http://locahost:6969/signUp', body);
    this.storage.set(this.data, userData);
    this.navCtrl.popToRoot();
  }

  // function to close the page
  close() {
    this.navCtrl.pop();
  }

};