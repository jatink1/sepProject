//importing necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  // necessary variables
  public timeBegan = null;
  public timeStopped: any = null;
  public stoppedDuration: any = 0;
  public started = null;
  public running = false;
  public blankTime = "00:00.000";
  public time = "00:00.000";

  subjectName: any;
  unitName: any;
  userId: any;
  timeList: any;

  userHours: any;
  userMinutes: any;
  userSeconds: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
  }

//timer code starts
  start() {
    if (this.running) return;
    if (this.timeBegan === null) {
     this.reset();
      this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration: any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  };
  stop() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);

    //saving time on localStorage
    this.storage.set('time', this.time);

  };
  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  };
  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  };
  clockRunning() {
    let currentTime: any = new Date()
    let timeElapsed: any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
    let hour = timeElapsed.getUTCHours()
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    //let ms = timeElapsed.getUTCMilliseconds();
    this.time =
     this.zeroPrefix(hour, 2) + ":" +
    this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) //+ "." +
    //this.zeroPrefix(ms, 3);
  };
//timer code ends

//function to store time in dataBase
  save() {
    //getting userId from localStorage
    this.storage.get('userId').then((val) => {
      this.userId = val;
      //00:00:00
      this.userHours = this.time.substr(0, 2);
      this.userMinutes = this.time.substr(3, 2);
      this.userSeconds = this.time.substr(6, 7);

      console.log(`UserId: ${this.userId}, Time : ${this.time}`);
      //for saving time studied on mysql database
      let body = {
        userId: this.userId,
        subjectName: this.subjectName,
        unitName: this.unitName,
        //time: this.time
        hours:this.userHours,
        minutes: this.userMinutes,
        seconds:this.userSeconds
      }
      this.http.post('http://localhost:6969/addTime', body).subscribe(res => {
        console.log("Time saved");
      });
    });
    this.saveTotal();
    this.navCtrl.pop();
  };

  // function to cancel timer
  cancel() {
    this.navCtrl.pop();
  };

  //functio to save total time
  saveTotal() {
    this.storage.get('userId').then((val) => {
      this.userId = val;
      let body = {
        unitName: this.unitName,
        subjectName: this.subjectName,
        userId:this.userId
      };
      this.http.post('http://localhost:6969/totalUnitTime', body).subscribe(res => {
        console.log("SUCCESS");
      });
    });
  };

//all functions should end above this
}