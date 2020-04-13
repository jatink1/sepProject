// importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject1DetailsPage } from '../subject1-details/subject1-details';
import { MenuController } from 'ionic-angular';
import { AddSubjectPage } from '../add-subject/add-subject';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TargetPage } from '../target/target';

@IonicPage()
@Component({
  selector: 'page-subject-list',
  templateUrl: 'subject-list.html',
})
export class SubjectListPage {

  //declaring variables to be used
  subjects: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public http:Http, public storage: Storage) {
  }

  // function to load all the subjects from server
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectListPage');
    this.storage.get('userId').then((val) => {
      this.userId = val
      //to read data from server
      var body = {
        userId: this.userId
      };
      this.http.post('http://localhost:6969/viewSubjects', body).subscribe(res => {
        this.subjects = res.json();
      });
    });
  }

  // function to load all the subjects from server in case previous function doesn't work
  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'myMenu');

    this.storage.get('userId').then((val) => {
      this.userId = val
      //to read data from server
      var body = {
        userId: this.userId
      };
      this.http.post('http://localhost:6969/viewSubjects', body).subscribe(res => {
        this.subjects = res.json();
      });
    });    
  };

  // function to go to details page of Subject 1
  seeDetails() {
    this.navCtrl.push(Subject1DetailsPage);
  };

  //to see units of selected subject
  viewUnit(subject: any) {
    let unit = subject;
    this.navCtrl.push(Subject1DetailsPage, { unit: unit });
  };

  //this is to add new subject
  addNewSubject() {
    this.navCtrl.push(AddSubjectPage);
  };

  // to navigate to timer page
  timer() {
    this.navCtrl.push(TargetPage);
  };
}