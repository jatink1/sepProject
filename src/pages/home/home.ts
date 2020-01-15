import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  back() {
    this.storage.set('loginKey', 1);
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

}
