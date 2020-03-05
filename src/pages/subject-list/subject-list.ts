import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject1DetailsPage } from '../subject1-details/subject1-details';

import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-subject-list',
  templateUrl: 'subject-list.html',
})
export class SubjectListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectListPage');
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'myMenu');
  }
  // function to go to details page of Subject 1
  seeDetails() {
    this.navCtrl.push(Subject1DetailsPage);
  }

}
