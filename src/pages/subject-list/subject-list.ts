import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject1DetailsPage } from '../subject1-details/subject1-details';


@IonicPage()
@Component({
  selector: 'page-subject-list',
  templateUrl: 'subject-list.html',
})
export class SubjectListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectListPage');
  }

  // function to go to details page of Subject 1
  seeDetails() {
    this.navCtrl.push(Subject1DetailsPage);
  }

}
