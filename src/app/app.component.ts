//importing necessary modules
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { SubjectListPage } from '../pages/subject-list/subject-list';
import { SettingsPage } from '../pages/settings/settings';
import { TimerPage } from '../pages/timer/timer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navCtrl: NavController;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();

      this.storage.get('logkey').then((val) => {
        if (val == 1)
        {
          this.navCtrl.setRoot(LoginPage);
          this.navCtrl.popToRoot();
        }
        else{
          this.navCtrl.setRoot(SubjectListPage);
          this.navCtrl.popToRoot();
        }
      })
    });
  };

  // logout function , will activate once user press on logout button
  logout() {
    this.storage.set('logkey', 1);
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  };
  
//navigation to settings page 
  settings(){
    this.navCtrl.push(SettingsPage);
  };

  //navigation to timer
  timer() {
    this.navCtrl.push(TimerPage);
  }

}

