import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {
  ref:any;
  rooms:any;
  usersRef:any;
  receiveruuid:any;
  receiverData:any;
  messageText:any;
  message:any;
  items:any;
  tablename:any;
  senderName:any;
  receiverName: any;
  messages:any;
  constructor(private eleRef:ElementRef, public navCtrl: NavController, public navParams: NavParams,private device: Device) {
    this.receiverData = this.navParams.get("data");
    this.messages = new Array();
    this.receiveruuid = this.receiverData.uuid;
    this.tablename = this.receiverData.tableName;
    this.receiverName = this.receiverData.receiverName;
    this.senderName = localStorage.getItem('displayName');
    this.ref = firebase.database().ref('chatrooms/'+this.tablename+'/messages');
    this.usersRef = firebase.database().ref('chatrooms/'+this.tablename+'/users');
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToMessagesArray(resp);
      this.populateData();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailPage');
    this.scrollMessageDivToBottom();
  }

  populateData(){
    // this.rooms.forEach(message => {
    //   this.messages.push(message[message.key]);
    // }); 

    this.rooms.forEach(message => {
      if(message.from != this.device.uuid){
        message.align = "left";
      }
      else{
        message.align = "right";
      }
    }); 
    this.messages = this.rooms;
  }

  scrollMessageDivToBottom(){
    var messageDiv = this.eleRef.nativeElement.querySelector(".chatList");
    messageDiv.scrollTo(0,messageDiv.scrollHeight);
  }

  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getDateStamp(tStamp:any){
    var time =  moment(tStamp,"MMM Do YYYY, hh:mm a").format("MMM Do YYYY");
    return time;
  }

  getTimeStamp(tStamp:any){
    var time =  moment(tStamp,"MMM Do YYYY, hh:mm a").format("hh:mm a");
    return time;
  }

  sendMessage(){
    var messageTstamp = moment().format("MMM Do YYYY, hh:mm a");
    this.messageText = String(this.messageText).trim();
    if(this.messageText != ""){
      this.ref.push({
        from: this.device.uuid,
        to: this.receiveruuid,
        name: this.senderName,
        message: this.messageText,
        tStamp: messageTstamp
      });
      this.messageText = "";
      this.usersRef.set({
        u1: this.device.uuid,
        u2: this.receiveruuid
      });
    }
    this.scrollMessageDivToBottom();
  }

}

export const snapshotToMessagesArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      // var itemsArray = new Array();
      // var itemkeys = new Array();
      // var tempObj:any = {};
      // itemkeys = Object.keys(item);
      // itemkeys.forEach(child => {
      //   tempObj.key = child;
      //   tempObj = item[child];
      //   itemsArray.push(tempObj);
      // });
      returnArr.push(item);
  });

  return returnArr;
};
