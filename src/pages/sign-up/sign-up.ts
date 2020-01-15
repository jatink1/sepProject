import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private storage: Storage) {
    
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

  submit() {
    let userData = {
      'uname': this.ngName,
      'uemail': this.ngEmail,
      'upassword':this.ngPassword
    }

    this.storage.set(this.data, userData);
    this.navCtrl.popToRoot();
  }

}
