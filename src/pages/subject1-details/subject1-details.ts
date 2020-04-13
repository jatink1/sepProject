// importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddUnitPage } from '../add-unit/add-unit';
import { Http } from '@angular/http';
import { TimerPage } from '../timer/timer';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-subject1-details',
  templateUrl: 'subject1-details.html',
})
export class Subject1DetailsPage {

  // declaring necessary variables
  subjectName: any;
  details: any;
  value: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public storage: Storage) {
  }

  // function to get units 
  ionViewWillEnter() {
    console.log('ionViewDidLoad Subject1DetailsPage');
    this.subjectName = this.navParams.get('unit').subjectName;
    console.log(this.subjectName);
    let body = {
      unit: this.subjectName
    }
    this.http.post('http://localhost:6969/viewUnit', body).subscribe(res => {
      this.details = res.json();
    });

    //storage
    this.storage.get('time').then((val) => {
      this.value = val;
    })
  };

  // to navigate to add unit page
  addUnit() {
    this.navCtrl.push(AddUnitPage);
  };

  // to navigate to timer page
  startTimer() {
    this.navCtrl.push(TimerPage);
  };
}
