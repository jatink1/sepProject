//importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-subject',
  templateUrl: 'add-subject.html',
})
export class AddSubjectPage {

  //defining variables to be used
  subjectName: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSubjectPage');
  }

  //function to add new subject
  addSubject() {
    this.storage.get('userId').then((val) => {
      this.userId = val;

      let body = {
        subjectName: this.subjectName,
        userId: this.userId
      }
      this.http.post('http://localhost:6969/addSubject', body).subscribe(res => {
        console.log("Subject Added");
      });
    });
    this.navCtrl.pop();
  }
}
