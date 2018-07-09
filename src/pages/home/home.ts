import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import * as firebase from 'Firebase';
import { ProfilePage } from '../profile/profile';
import * as moment from 'moment';
import { PopoverPage } from '../popover/popover';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef; map: any;
  loader:any;
  markers:any;
  ref:any;
  name:any;
  userData:any;
  watch:any;
  userloc:any;
  usersInRadiusArray:any;
  directionsService:any;
  selectedRadius:any;
  deviceId:any;
  zoomScale: any;
  constructor(public navCtrl: NavController,private navParams:NavParams, public platform: Platform, private geolocation: Geolocation, private device: Device, private elementRef:ElementRef, private loading:LoadingController, public popoverCtrl: PopoverController, private alertCtrl: AlertController) {
    this.markers = new Array();
    this.usersInRadiusArray = new Array();
    this.zoomScale = 15;
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.ref = firebase.database().ref('geolocations/');
    this.directionsService = new google.maps.DirectionsService;
    this.selectedRadius = 5;
    platform.ready().then(() => {
      this.deviceId = this.device.uuid;
    });
    localStorage.setItem('displayName',this.userData.displayName);
  }

  presentLoading(){
    this.loader = this.loading.create();
    this.loader.present();
  }

  ionViewDidLoad(){
    
  }

  ionViewWillEnter(){
    this.loadTheView();
  }

  loadTheView(){
    this.presentLoading();
    this.geolocation.getCurrentPosition({ maximumAge: 10000000, timeout: 2000000, enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.userloc = mylocation;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: this.zoomScale,
        center: mylocation
      });
    });
    this.loader.dismiss();
    var self = this;
    setTimeout(function(){
      self.watch = self.geolocation.watchPosition();
      self.watch.subscribe((data) => {
        self.deleteMarkers();
        self.updateGeolocation(self.device.uuid, data.coords.latitude,data.coords.longitude);
      });

      self.platform.ready().then(() => {
        self.ref = firebase.database().ref('geolocations/');
        self.ref.on('value', resp => {
          self.deleteMarkers();
          self.usersInRadiusArray = Array();
            snapshotToArray(resp).forEach(data => {
              if(data.uuid !== self.device.uuid) {
                var temploc = new google.maps.LatLng(data.latitude,data.longitude);
                self.calculateAndDisplayRoute(self.userloc,temploc).then((distance) => {
                  data.distance = distance;
                  if(distance < self.selectedRadius){
                    self.usersInRadiusArray.push(data);
                    self.populateData();
                  }
                });
              }
              else{
                let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
                self.userloc = updatelocation;
                data.distance = -1;
                self.usersInRadiusArray.push(data);
                self.populateData();
              }
            });
          });
        });
    },3000);
  }

  showPopOver(){
    var options = {
      enableBackdropDismiss: false
    }
    var popover = this.popoverCtrl.create(PopoverPage,options);
    popover.present();
    popover.onDidDismiss(data =>{
      console.log(data);
      switch(data){
        case 0:
          this.zoomScale = 5;
          this.selectedRadius = 1000;
          this.loadTheView();
          break;
        case 5:
          this.zoomScale = 13;
          this.selectedRadius = 5;
          this.loadTheView();
          break;
        case 10:
          this.zoomScale = 12;
          this.selectedRadius = 10;
          this.loadTheView();
          break;
        case 15: 
          this.zoomScale = 11;
          this.selectedRadius = 15;
          this.loadTheView();
          break;
        default:
          this.zoomScale = 13;
          this.selectedRadius = 5;
          this.loadTheView();
          break;
      }
    });
  }

  populateData(){
    this.deleteMarkers();
      this.usersInRadiusArray.forEach(data => {
        if(data.uuid !== this.deviceId) {
        let image = 'assets/imgs/location.png';
        let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
        this.addMarker(data,updatelocation,image);
        this.setMapOnAll(this.map);
      } else {
        let image = 'assets/imgs/userlocation.png';
        let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
        this.userloc = updatelocation;
        this.addMarker(data,updatelocation,image);
        this.setMapOnAll(this.map);
      }
    });
  }

  showInfo(){
    let alert = this.alertCtrl.create({
      title: 'App Info',
      subTitle: "This app is still in development stage. In case of marker issues, press refresh icon. Radius for search can be adjusted using the settings icon. If chat messages don't appear, restart the application!",
      buttons: ['Okay']
    });
    alert.present();
  }

  calculateAndDisplayRoute(p1,p2): Promise<any> {
    return new Promise((resolve, reject) => {
      var _request = {
        origin: p1,
        destination: p2,
        travelMode: 'WALKING'
      };

      this.directionsService.route(_request,function (_response,_status) {
          if (_status == google.maps.DirectionsStatus.OK) {
            var point = _response.routes[0].legs[0];
            let miles = point.distance.value * 0.000621371;
            resolve(miles);
          }
          else{
            resolve(-1);
          }
      });
    });
}

  addMarker(data,location, image) {
    var content;
    var imageUrl:any;
    if(data.imageUrl == null || data.imageUrl == ""){
      imageUrl = "./assets/imgs/profile-placeholder.png";
    }
    else{
      imageUrl = data.imageUrl;
    }
    
    if(data.uuid !== this.deviceId){
     content = "<div style='display:block;'><img src='" +imageUrl+ "' class='displayImage'><p class='dispName'>"+data.name+"</p></div><br /><p class='locText'>Distance: " + data.distance.toFixed(1) + " miles</p><p class='timeClass'>Last seen: "+ getLastSeen(data.timestamp)+ "</p><button id='moreButton'>Profile</button>";
    }
    else{
      content = "<div style='display:block;'><img src='" +imageUrl+ "' class='displayImage'><p class='dispName'>"+data.name+"</p></div><br /><p class='locText'>This is your location</p><p class='timeClass'>Last seen: "+ getLastSeen(data.timestamp)+ "</p><button id='moreButton'>Profile</button>"; 
    }
     var infowindow = new google.maps.InfoWindow({
      content: content
    });
    
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image,
      animation: google.maps.Animation.DROP
    });

    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    var self = this;
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(self.map,marker);
      var moreButton = self.elementRef.nativeElement.querySelector("#moreButton");
      if(moreButton != null){
        moreButton.addEventListener("click", function () {
          console.log('Details clicked');
          self.navCtrl.setRoot(ProfilePage,{"data":data});
        });
      }
    });

    this.markers.push(marker);
  }
  
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uuid, lat, lng) {
    this.deleteMarkers();
    var timestampNow = moment().format("DD/MM/YYYY HH:mm");
    if(localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/'+localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude : lng,
        name: this.userData.displayName,
        email: this.userData.email,
        imageUrl: this.userData.imageUrl,
        timestamp: timestampNow
      });
    } else {
      var array;
      var isPresentFlag:any = false;
      var keyIfPresent = "";
      var usersRef = firebase.database().ref('geolocations/');
      usersRef.on('value',resp =>{
        array = snapshotToArray(resp);
      });
      array.forEach(element => {
        if(element.uuid == this.deviceId){
          isPresentFlag = true;
          keyIfPresent = element.key;
        }
      });
      if(isPresentFlag == false){
        let newData = this.ref.push();
        newData.set({
          uuid: uuid,
          latitude: lat,
          longitude: lng,
          name: this.userData.displayName,
          email: this.userData.email,
          imageUrl: this.userData.imageUrl,
          timestamp: timestampNow
        });
        localStorage.setItem('mykey', newData.key);
      }
      else{
        firebase.database().ref('geolocations/'+keyIfPresent).set({
          uuid: uuid,
          latitude: lat,
          longitude: lng,
          name: this.userData.displayName,
          email: this.userData.email,
          imageUrl: this.userData.imageUrl,
          timestamp: timestampNow
        });
      }
      
    }
  }

  ionViewDidLeave(){
    
  }

}

function getLastSeen(time:any){
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

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

