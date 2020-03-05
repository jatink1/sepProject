import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SubjectListPage } from '../subject-list/subject-list';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginEmail: AbstractControl;
  loginPassword: AbstractControl;
  data: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private storage: Storage, private alertCtrl: AlertController) {
    
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

  login() {
    this.storage.get(this.data).then((val) => {
      console.log("email: ", val['uemail']);
      console.log("Password: ", val['upassword']);

      if (this.loginEmail.value === val['uemail'] && this.loginPassword.value === val['upassword'])
      {
        this.storage.set('loginKey', this.loginEmail.value);
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
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }

}
