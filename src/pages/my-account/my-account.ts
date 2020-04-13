//importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  // declaring variables to be used
  userId: any;
  details: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public storage:Storage) {
  }

  //function to fetch user details from server
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
    this.storage.get('userId').then((val) => {
      this.userId = val;
    
      let body = {
        userId: this.userId
      }

      this.http.post('http://localhost:6969/getUserDetails', body).subscribe(res => {
        this.details = res.json();
      })
    });
  }

}
