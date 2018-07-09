import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { Device } from '@ionic-native/device';
import { ChatDetailPage } from '../chat-detail/chat-detail';
import * as moment from 'moment';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userData:any;
  receiveruuid:any;
  tablename: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController,private device:Device) {
    this.userData = this.navParams.get("data");
    this.receiveruuid = this.userData.uuid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage,{"data":this.userData});
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Chat',
      subTitle: "You don't need to chat with yourself here!",
      buttons: ['Okay']
    });
    alert.present();
  }

  sortAlphabets(text) {
    return text.split('').sort().join('');
  }

  chatButtonClicked(){
    if(this.receiveruuid == this.device.uuid){
      this.presentAlert();
    }
    else{
      this.tablename = this.sortAlphabets(this.device.uuid + this.receiveruuid);
      var receiverObj = {
        "uuid" : this.receiveruuid,
        "tableName": this.tablename
      };
      this.navCtrl.setRoot(ChatDetailPage,{"data":receiverObj});
    }
  }

  getLastSeen(time:any){
    if(time != null){
      var timeMoment = moment(time,"DD/MM/YYYY HH:mm");
      // var currentMoment = moment();
      // var diffHours = currentMoment.diff(timeMoment,'hours');
      var returnString:any = timeMoment.fromNow();
      return returnString;
    }
    else{
      return "Unavailable";
    }
    
  }

}
