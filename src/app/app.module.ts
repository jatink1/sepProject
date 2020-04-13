import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { IonicStorageModule } from '@ionic/storage';
import { SubjectListPage } from '../pages/subject-list/subject-list';
import { Subject1DetailsPage } from '../pages/subject1-details/subject1-details';
import { AddSubjectPage } from '../pages/add-subject/add-subject';
import { AddUnitPage } from '../pages/add-unit/add-unit';
import { SettingsPage } from '../pages/settings/settings';
import { MyAccountPage } from '../pages/my-account/my-account';

import { HttpModule } from '@angular/http';
import { TimerPage } from '../pages/timer/timer';
import { TargetPage } from '../pages/target/target';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    SubjectListPage,
    Subject1DetailsPage,
    AddSubjectPage,
    AddUnitPage,
    SettingsPage,
    MyAccountPage,
    TimerPage,
    TargetPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    SubjectListPage,
    Subject1DetailsPage,
    AddSubjectPage,
    AddUnitPage,
    SettingsPage,
    MyAccountPage,
    TimerPage,
    TargetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
