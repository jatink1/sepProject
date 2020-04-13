//importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SubjectListPage } from '../subject-list/subject-list';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // declaring variables to be used
  loginForm: FormGroup;
  loginEmail: AbstractControl;
  loginPassword: AbstractControl;
  data: string;
  email: any;
  password: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private storage: Storage, private alertCtrl: AlertController, public http: Http) {

    this.loginForm = formBuilder.group({
      loginEmail: ['', Validators.compose([Validators.required])],
      loginPassword: ['', Validators.compose([Validators.required])]
    });

    this.loginEmail = this.loginForm.controls['loginEmail'];
    this.loginPassword = this.loginForm.controls['loginPassword'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // user authentication from server
  login() {
    let body = {
      email: this.email,
      password: this.password
    }
    this.http.post('http://localhost:6969/userAuth', body).subscribe(res => {
      if (res.json().success) {
        console.log("Correct credentials");
        console.log("the userId of current user is: ", res.json().id);
        this.userId = res.json().id;
        //storing userId in localStorage
        this.storage.set('userId', this.userId);
        this.navCtrl.setRoot(SubjectListPage);
        this.navCtrl.popToRoot();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Wrong Credentials',
          message: 'Please enter registered Email and Password',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    });
    this.storage.set('logkey', 10);
  };

  // navigating to singUP page
  signUp() {
    this.navCtrl.push(SignUpPage);
  };

}
