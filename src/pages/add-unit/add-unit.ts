//importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-unit',
  templateUrl: 'add-unit.html',
})
export class AddUnitPage {

  unitName: any;
  subjectName: any;
  userId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUnitPage');
  }

  //function to add new unit
  addUnit() {
    this.storage.get('userId').then((val) => {
      this.userId = val;
      let body = {
        unitName: this.unitName,
        userId: this.userId,
        subjectName: this.subjectName
      }
      this.http.post('http://localhost:6969/addUnit', body).subscribe(res => {
        console.log("Unit added");
      });
    });
    this.navCtrl.pop();
  }

}
