import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from '../pages/chat/chat';
import { GooglePlus } from '@ionic-native/google-plus';
import { AboutPage } from '../pages/about/about';

const config = {
  apiKey: 'AIzaSyBZCqvahcIyiDCN58A3AWsPwg_CgesKY9o',
  projectId: 'rangefinder-b9078',
  databaseURL:'https://rangefinder-b9078.firebaseio.com/',
  storageBucket:"rangefinder-b9078.appspot.com"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private googlePlus: GooglePlus) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }

  goToHomePage(){
    this.nav.setRoot(HomePage);
  }

  goToMessages(){
    this.nav.setRoot(ChatPage);
  }

  goToAbout(){
    this.nav.setRoot(AboutPage);
  }

  logout(){
    this.googlePlus.logout();
    this.nav.setRoot(LoginPage);
  }
  
}

