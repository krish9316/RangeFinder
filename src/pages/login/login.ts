import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader:any;
  displayName:any;
  email:any;
  familyName:any;
  givenName:any;
  userId:any;
  imageUrl:any;
  isLoggedIn:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform:Platform,private googlePlus: GooglePlus, private loading:LoadingController) {
    platform.ready().then(() => {

    });
  }

  presentLoading(){
    this.loader = this.loading.create();
    this.loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithGoogle(){
    this.presentLoading();
    this.googlePlus.login({})
    .then(res => {
      this.loader.dismiss();
      console.log(res);
      this.displayName = res.displayName;
      this.email = res.email;
      this.familyName = res.familyName;
      this.givenName = res.givenName;
      this.userId = res.userId;
      this.imageUrl = res.imageUrl;
      this.isLoggedIn = true;
      localStorage.setItem('userData',JSON.stringify(res));
      this.navCtrl.setRoot(HomePage);
    })
    .catch(err => {
      console.error(err);
    });
  }

}
