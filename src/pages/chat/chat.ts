import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Device } from '@ionic-native/device';
import { ChatDetailPage } from '../chat-detail/chat-detail';
import * as moment from 'moment';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  ref:any;
  rooms:any;
  receiveruuid:any;
  deviceId:any;
  loader:any;
  // receiverData:any;
  usersRef:any;
  usersArray:any;
  message:any;
  items:any;
  tablename:any;
  senderName:any;
  messages:any;
  noMessagesText:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private device: Device, private loading: LoadingController) {
    // this.receiverData = this.navParams.get("data");
    this.messages = new Array();
    this.usersArray = new Array();
    this.deviceId = this.device.uuid;
    // this.receiveruuid = this.receiverData.uuid;
    // this.tablename = this.sortAlphabets(this.device.uuid + this.receiveruuid);
    this.senderName = "";
    this.noMessagesText = true;
    this.usersArray = [];
    this.usersRef = firebase.database().ref('geolocations/');
    this.usersRef.on('value', resp => {
      snapshotToArray(resp).forEach(data => {
        this.usersArray.push(data);
      });
    });
    this.presentLoading();
    this.ref = firebase.database().ref('chatrooms/');
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.populateData();
    });

  }

  presentLoading(){
    this.loader = this.loading.create();
    this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  populateData(){
    this.messages = [];
    this.rooms.forEach(element => {
      var user1 = element["users"]["u1"];
      var user2 = element["users"]["u2"];
      if(this.device.uuid == user1 || this.device.uuid == user2){
        var item = element["messages"];
        let len = Object.keys(element["messages"]).length - 1;
        var key = Object.keys(element["messages"])[len];
        this.messages.push(item[key]);
      }
    });
    if(this.messages.length > 0){
      this.noMessagesText = false;
    }
    this.loader.dismiss();
  }

  sortAlphabets(text) {
    return text.split('').sort().join('');
  }

  getDateStamp(tStamp:any){
    var time =  moment(tStamp,"MMM Do YYYY, hh:mm a").format("MMM Do YYYY");
    return time;
  }

  getReceiverName(index){
    var name:any;
    var item = this.messages[index];
    var receiveruuid;
    if(item.from != this.deviceId){
      receiveruuid = item.from;
    }
    else{
      receiveruuid = item.to;
    }
    this.usersArray.forEach(element => {
      if(element.uuid == receiveruuid){
        name = element.name;
      }
    });
    return name;
  }

  goToChatDetail(i:any){
    var key = Object.keys(this.rooms[i]["messages"])[0];
    if(this.device.uuid != this.rooms[i]["messages"][key]["from"]){
      this.receiveruuid = this.rooms[i]["messages"][key]["from"];
    }
    else{
      this.receiveruuid = this.rooms[i]["messages"][key]["to"];
    }
    
    this.tablename = this.sortAlphabets(this.device.uuid + this.receiveruuid);
    var receiverObj = {
        "uuid": this.receiveruuid,
        "tableName": this.tablename,
        "receiverName": this.getReceiverName(i)
    };
    // this.receiverData.tableName = this.tablename;
    this.navCtrl.setRoot(ChatDetailPage,{"data":receiverObj});
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};



