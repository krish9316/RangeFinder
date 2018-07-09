webpackJsonp([6],{

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/about/about.html"*/'<!--\n  Generated template for the AboutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>About</ion-title>\n    <ion-buttons left>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<p>This is a test project for range finder, stranger chat</p>\n<p>Version 0.0.1</p>\n<span class="footer">&copy; All rights reserved. - Krishna Rohit Komanduri😄</span>\n</ion-content>\n'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/about/about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_detail_chat_detail__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, navParams, device, loading) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.loading = loading;
        // this.receiverData = this.navParams.get("data");
        this.messages = new Array();
        this.usersArray = new Array();
        this.deviceId = this.device.uuid;
        // this.receiveruuid = this.receiverData.uuid;
        // this.tablename = this.sortAlphabets(this.device.uuid + this.receiveruuid);
        this.senderName = "";
        this.noMessagesText = true;
        this.usersArray = [];
        this.usersRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('geolocations/');
        this.usersRef.on('value', function (resp) {
            snapshotToArray(resp).forEach(function (data) {
                _this.usersArray.push(data);
            });
        });
        this.presentLoading();
        this.ref = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('chatrooms/');
        this.ref.on('value', function (resp) {
            _this.rooms = [];
            _this.rooms = snapshotToArray(resp);
            _this.populateData();
        });
    }
    ChatPage.prototype.presentLoading = function () {
        this.loader = this.loading.create();
        this.loader.present();
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
    };
    ChatPage.prototype.populateData = function () {
        var _this = this;
        this.messages = [];
        this.rooms.forEach(function (element) {
            var user1 = element["users"]["u1"];
            var user2 = element["users"]["u2"];
            if (_this.device.uuid == user1 || _this.device.uuid == user2) {
                var item = element["messages"];
                var len = Object.keys(element["messages"]).length - 1;
                var key = Object.keys(element["messages"])[len];
                _this.messages.push(item[key]);
            }
        });
        if (this.messages.length > 0) {
            this.noMessagesText = false;
        }
        this.loader.dismiss();
    };
    ChatPage.prototype.sortAlphabets = function (text) {
        return text.split('').sort().join('');
    };
    ChatPage.prototype.getDateStamp = function (tStamp) {
        var time = __WEBPACK_IMPORTED_MODULE_5_moment__(tStamp, "MMM Do YYYY, hh:mm a").format("MMM Do YYYY");
        return time;
    };
    ChatPage.prototype.getReceiverName = function (index) {
        var name;
        var item = this.messages[index];
        var receiveruuid;
        if (item.from != this.deviceId) {
            receiveruuid = item.from;
        }
        else {
            receiveruuid = item.to;
        }
        this.usersArray.forEach(function (element) {
            if (element.uuid == receiveruuid) {
                name = element.name;
            }
        });
        return name;
    };
    ChatPage.prototype.goToChatDetail = function (i) {
        var key = Object.keys(this.rooms[i]["messages"])[0];
        if (this.device.uuid != this.rooms[i]["messages"][key]["from"]) {
            this.receiveruuid = this.rooms[i]["messages"][key]["from"];
        }
        else {
            this.receiveruuid = this.rooms[i]["messages"][key]["to"];
        }
        this.tablename = this.sortAlphabets(this.device.uuid + this.receiveruuid);
        var receiverObj = {
            "uuid": this.receiveruuid,
            "tableName": this.tablename,
            "receiverName": this.getReceiverName(i)
        };
        // this.receiverData.tableName = this.tablename;
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__chat_detail_chat_detail__["a" /* ChatDetailPage */], { "data": receiverObj });
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/chat/chat.html"*/'<!--\n  Generated template for the ChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Chat</ion-title>\n    <ion-buttons left>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content id="chatLand">\n  <p *ngIf="noMessagesText == true" class="noMessageText">No messages to display.</p>\n  <ion-list class="chatList">\n    <ion-item *ngFor="let messageObj of messages; let i = index;" class="chatItem" (click)="goToChatDetail(i)">\n      <span class="title">{{this.getReceiverName(i)}}</span>\n      <span class="subtitle">{{messageObj.message}}</span><span class="subtitle2">{{this.getDateStamp(messageObj.tStamp)}}</span>\n    </ion-item>\n  </ion-list>\n  <!-- <button ion-button (click)="sendMessage()" style="width: 100%;height: 5%;">Send message</button> -->\n</ion-content>\n'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ChatPage);
    return ChatPage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, platform, googlePlus, loading) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.googlePlus = googlePlus;
        this.loading = loading;
        platform.ready().then(function () {
        });
    }
    LoginPage.prototype.presentLoading = function () {
        this.loader = this.loading.create();
        this.loader.present();
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.loginWithGoogle = function () {
        var _this = this;
        this.presentLoading();
        this.googlePlus.login({})
            .then(function (res) {
            _this.loader.dismiss();
            console.log(res);
            _this.displayName = res.displayName;
            _this.email = res.email;
            _this.familyName = res.familyName;
            _this.givenName = res.givenName;
            _this.userId = res.userId;
            _this.imageUrl = res.imageUrl;
            _this.isLoggedIn = true;
            localStorage.setItem('userData', JSON.stringify(res));
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <button ion-button (click)="loginWithGoogle()" class="signin"></button>\n</ion-content>\n'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_detail_chat_detail__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, alertCtrl, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.device = device;
        this.userData = this.navParams.get("data");
        this.receiveruuid = this.userData.uuid;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.goToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { "data": this.userData });
    };
    ProfilePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Chat',
            subTitle: "You don't need to chat with yourself here!",
            buttons: ['Okay']
        });
        alert.present();
    };
    ProfilePage.prototype.sortAlphabets = function (text) {
        return text.split('').sort().join('');
    };
    ProfilePage.prototype.chatButtonClicked = function () {
        if (this.receiveruuid == this.device.uuid) {
            this.presentAlert();
        }
        else {
            this.tablename = this.sortAlphabets(this.device.uuid + this.receiveruuid);
            var receiverObj = {
                "uuid": this.receiveruuid,
                "tableName": this.tablename
            };
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__chat_detail_chat_detail__["a" /* ChatDetailPage */], { "data": receiverObj });
        }
    };
    ProfilePage.prototype.getLastSeen = function (time) {
        if (time != null) {
            var timeMoment = __WEBPACK_IMPORTED_MODULE_5_moment__(time, "DD/MM/YYYY HH:mm");
            // var currentMoment = moment();
            // var diffHours = currentMoment.diff(timeMoment,'hours');
            var returnString = timeMoment.fromNow();
            return returnString;
        }
        else {
            return "Unavailable";
        }
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar dark>\n      <!-- <ion-buttons left *ngIf="!hideBackButton">\n          <button ion-button icon-only class="backbutton" (click)="goToHome()">\n            <ion-icon name="arrow-back"></ion-icon>\n          </button>\n      </ion-buttons> -->\n    <ion-title>Profile</ion-title>\n    <ion-buttons left>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <img src="{{this.userData.imageUrl != nil ? this.userData.imageUrl : \'../assets/imgs/profile-placeholder.png\'}}" class="displayPictureBig">\n  <h6 class="displayNameBig">{{this.userData.name}}</h6>\n  <h6 class="lastSeen">{{"Last seen: " + this.getLastSeen(this.userData.timestamp)}}</h6>\n  <button ion-button (click)="chatButtonClicked()" class="chatButton">Chat</button>\n</ion-content>\n'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PopoverPage = /** @class */ (function () {
    function PopoverPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    PopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopoverPage');
    };
    PopoverPage.prototype.dismissWithValue = function (value) {
        this.viewCtrl.dismiss(value);
    };
    PopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popover',template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/popover/popover.html"*/'<!--\n  Generated template for the PopoverPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="transparentBack">\n  <button ion-button class="popoverButton" (click)="dismissWithValue(5)">5</button>\n  <button ion-button class="popoverButton" (click)="dismissWithValue(10)">10</button>\n  <button ion-button class="popoverButton" (click)="dismissWithValue(15)">15</button>\n  <button ion-button class="popoverButtonInfinite" (click)="dismissWithValue(0)"></button>\n</ion-content>\n'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/popover/popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], PopoverPage);
    return PopoverPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		569,
		5
	],
	"../pages/chat-detail/chat-detail.module": [
		570,
		4
	],
	"../pages/chat/chat.module": [
		571,
		3
	],
	"../pages/login/login.module": [
		572,
		2
	],
	"../pages/popover/popover.module": [
		573,
		1
	],
	"../pages/profile/profile.module": [
		574,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 200;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(434);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_chat_chat__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_chat_detail_chat_detail__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_about_about__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_popover_popover__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_chat_detail_chat_detail__["a" /* ChatDetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_popover_popover__["a" /* PopoverPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat-detail/chat-detail.module#ChatDetailPageModule', name: 'ChatDetailPage', segment: 'chat-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/popover/popover.module#PopoverPageModule', name: 'PopoverPage', segment: 'popover', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_chat_detail_chat_detail__["a" /* ChatDetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_popover_popover__["a" /* PopoverPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__["a" /* GooglePlus */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 245,
	"./af.js": 245,
	"./ar": 246,
	"./ar-dz": 247,
	"./ar-dz.js": 247,
	"./ar-kw": 248,
	"./ar-kw.js": 248,
	"./ar-ly": 249,
	"./ar-ly.js": 249,
	"./ar-ma": 250,
	"./ar-ma.js": 250,
	"./ar-sa": 251,
	"./ar-sa.js": 251,
	"./ar-tn": 252,
	"./ar-tn.js": 252,
	"./ar.js": 246,
	"./az": 253,
	"./az.js": 253,
	"./be": 254,
	"./be.js": 254,
	"./bg": 255,
	"./bg.js": 255,
	"./bm": 256,
	"./bm.js": 256,
	"./bn": 257,
	"./bn.js": 257,
	"./bo": 258,
	"./bo.js": 258,
	"./br": 259,
	"./br.js": 259,
	"./bs": 260,
	"./bs.js": 260,
	"./ca": 261,
	"./ca.js": 261,
	"./cs": 262,
	"./cs.js": 262,
	"./cv": 263,
	"./cv.js": 263,
	"./cy": 264,
	"./cy.js": 264,
	"./da": 265,
	"./da.js": 265,
	"./de": 266,
	"./de-at": 267,
	"./de-at.js": 267,
	"./de-ch": 268,
	"./de-ch.js": 268,
	"./de.js": 266,
	"./dv": 269,
	"./dv.js": 269,
	"./el": 270,
	"./el.js": 270,
	"./en-au": 271,
	"./en-au.js": 271,
	"./en-ca": 272,
	"./en-ca.js": 272,
	"./en-gb": 273,
	"./en-gb.js": 273,
	"./en-ie": 274,
	"./en-ie.js": 274,
	"./en-il": 275,
	"./en-il.js": 275,
	"./en-nz": 276,
	"./en-nz.js": 276,
	"./eo": 277,
	"./eo.js": 277,
	"./es": 278,
	"./es-do": 279,
	"./es-do.js": 279,
	"./es-us": 280,
	"./es-us.js": 280,
	"./es.js": 278,
	"./et": 281,
	"./et.js": 281,
	"./eu": 282,
	"./eu.js": 282,
	"./fa": 283,
	"./fa.js": 283,
	"./fi": 284,
	"./fi.js": 284,
	"./fo": 285,
	"./fo.js": 285,
	"./fr": 286,
	"./fr-ca": 287,
	"./fr-ca.js": 287,
	"./fr-ch": 288,
	"./fr-ch.js": 288,
	"./fr.js": 286,
	"./fy": 289,
	"./fy.js": 289,
	"./gd": 290,
	"./gd.js": 290,
	"./gl": 291,
	"./gl.js": 291,
	"./gom-latn": 292,
	"./gom-latn.js": 292,
	"./gu": 293,
	"./gu.js": 293,
	"./he": 294,
	"./he.js": 294,
	"./hi": 295,
	"./hi.js": 295,
	"./hr": 296,
	"./hr.js": 296,
	"./hu": 297,
	"./hu.js": 297,
	"./hy-am": 298,
	"./hy-am.js": 298,
	"./id": 299,
	"./id.js": 299,
	"./is": 300,
	"./is.js": 300,
	"./it": 301,
	"./it.js": 301,
	"./ja": 302,
	"./ja.js": 302,
	"./jv": 303,
	"./jv.js": 303,
	"./ka": 304,
	"./ka.js": 304,
	"./kk": 305,
	"./kk.js": 305,
	"./km": 306,
	"./km.js": 306,
	"./kn": 307,
	"./kn.js": 307,
	"./ko": 308,
	"./ko.js": 308,
	"./ky": 309,
	"./ky.js": 309,
	"./lb": 310,
	"./lb.js": 310,
	"./lo": 311,
	"./lo.js": 311,
	"./lt": 312,
	"./lt.js": 312,
	"./lv": 313,
	"./lv.js": 313,
	"./me": 314,
	"./me.js": 314,
	"./mi": 315,
	"./mi.js": 315,
	"./mk": 316,
	"./mk.js": 316,
	"./ml": 317,
	"./ml.js": 317,
	"./mn": 318,
	"./mn.js": 318,
	"./mr": 319,
	"./mr.js": 319,
	"./ms": 320,
	"./ms-my": 321,
	"./ms-my.js": 321,
	"./ms.js": 320,
	"./mt": 322,
	"./mt.js": 322,
	"./my": 323,
	"./my.js": 323,
	"./nb": 324,
	"./nb.js": 324,
	"./ne": 325,
	"./ne.js": 325,
	"./nl": 326,
	"./nl-be": 327,
	"./nl-be.js": 327,
	"./nl.js": 326,
	"./nn": 328,
	"./nn.js": 328,
	"./pa-in": 329,
	"./pa-in.js": 329,
	"./pl": 330,
	"./pl.js": 330,
	"./pt": 331,
	"./pt-br": 332,
	"./pt-br.js": 332,
	"./pt.js": 331,
	"./ro": 333,
	"./ro.js": 333,
	"./ru": 334,
	"./ru.js": 334,
	"./sd": 335,
	"./sd.js": 335,
	"./se": 336,
	"./se.js": 336,
	"./si": 337,
	"./si.js": 337,
	"./sk": 338,
	"./sk.js": 338,
	"./sl": 339,
	"./sl.js": 339,
	"./sq": 340,
	"./sq.js": 340,
	"./sr": 341,
	"./sr-cyrl": 342,
	"./sr-cyrl.js": 342,
	"./sr.js": 341,
	"./ss": 343,
	"./ss.js": 343,
	"./sv": 344,
	"./sv.js": 344,
	"./sw": 345,
	"./sw.js": 345,
	"./ta": 346,
	"./ta.js": 346,
	"./te": 347,
	"./te.js": 347,
	"./tet": 348,
	"./tet.js": 348,
	"./tg": 349,
	"./tg.js": 349,
	"./th": 350,
	"./th.js": 350,
	"./tl-ph": 351,
	"./tl-ph.js": 351,
	"./tlh": 352,
	"./tlh.js": 352,
	"./tr": 353,
	"./tr.js": 353,
	"./tzl": 354,
	"./tzl.js": 354,
	"./tzm": 355,
	"./tzm-latn": 356,
	"./tzm-latn.js": 356,
	"./tzm.js": 355,
	"./ug-cn": 357,
	"./ug-cn.js": 357,
	"./uk": 358,
	"./uk.js": 358,
	"./ur": 359,
	"./ur.js": 359,
	"./uz": 360,
	"./uz-latn": 361,
	"./uz-latn.js": 361,
	"./uz.js": 360,
	"./vi": 362,
	"./vi.js": 362,
	"./x-pseudo": 363,
	"./x-pseudo.js": 363,
	"./yo": 364,
	"./yo.js": 364,
	"./zh-cn": 365,
	"./zh-cn.js": 365,
	"./zh-hk": 366,
	"./zh-hk.js": 366,
	"./zh-tw": 367,
	"./zh-tw.js": 367
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 537;

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var config = {
    apiKey: 'AIzaSyBZCqvahcIyiDCN58A3AWsPwg_CgesKY9o',
    projectId: 'rangefinder-b9078',
    databaseURL: 'https://rangefinder-b9078.firebaseio.com/',
    storageBucket: "rangefinder-b9078.appspot.com"
};
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, googlePlus) {
        this.googlePlus = googlePlus;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_5_firebase__["initializeApp"](config);
    }
    MyApp.prototype.goToHomePage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.goToMessages = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__["a" /* ChatPage */]);
    };
    MyApp.prototype.goToAbout = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */]);
    };
    MyApp.prototype.logout = function () {
        this.googlePlus.logout();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/app/app.html"*/'<ion-menu persistent=“true” [swipeEnabled]="false" [content]="content" side="left" id="sideMenu">\n        <ion-header>\n        </ion-header>\n      \n        <ion-content class="menuGradient">\n        <span>\n            <img src="./assets/imgs/silhouette.png" class="menuBanner">\n        </span>\n          <ion-list>\n            <ion-item menuClose>\n                <button ion-button (click)="goToHomePage()" class="menuButton">Home</button>\n            </ion-item>\n            <ion-item menuClose>\n                <button ion-button (click)="goToMessages()" class="menuButton">Messages</button>\n            </ion-item>\n            <ion-item menuClose>\n                <button ion-button (click)="logout()" class="menuButton">Logout</button>\n            </ion-item>\n            <ion-item menuClose>\n                <button ion-button (click)="goToAbout()" class="menuButton">About</button>\n            </ion-item>\n          </ion-list>\n        </ion-content>\n      \n      </ion-menu>\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popover_popover__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, platform, geolocation, device, elementRef, loading, popoverCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.geolocation = geolocation;
        this.device = device;
        this.elementRef = elementRef;
        this.loading = loading;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.markers = new Array();
        this.usersInRadiusArray = new Array();
        this.zoomScale = 15;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.ref = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('geolocations/');
        this.directionsService = new google.maps.DirectionsService;
        this.selectedRadius = 5;
        platform.ready().then(function () {
            _this.deviceId = _this.device.uuid;
        });
        localStorage.setItem('displayName', this.userData.displayName);
    }
    HomePage.prototype.presentLoading = function () {
        this.loader = this.loading.create();
        this.loader.present();
    };
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.loadTheView();
    };
    HomePage.prototype.loadTheView = function () {
        var _this = this;
        this.presentLoading();
        this.geolocation.getCurrentPosition({ maximumAge: 10000000, timeout: 2000000, enableHighAccuracy: true }).then(function (resp) {
            var mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            _this.userloc = mylocation;
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, {
                zoom: _this.zoomScale,
                center: mylocation
            });
        });
        this.loader.dismiss();
        var self = this;
        setTimeout(function () {
            self.watch = self.geolocation.watchPosition();
            self.watch.subscribe(function (data) {
                self.deleteMarkers();
                self.updateGeolocation(self.device.uuid, data.coords.latitude, data.coords.longitude);
            });
            self.platform.ready().then(function () {
                self.ref = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('geolocations/');
                self.ref.on('value', function (resp) {
                    self.deleteMarkers();
                    self.usersInRadiusArray = Array();
                    snapshotToArray(resp).forEach(function (data) {
                        if (data.uuid !== self.device.uuid) {
                            var temploc = new google.maps.LatLng(data.latitude, data.longitude);
                            self.calculateAndDisplayRoute(self.userloc, temploc).then(function (distance) {
                                data.distance = distance;
                                if (distance < self.selectedRadius) {
                                    self.usersInRadiusArray.push(data);
                                    self.populateData();
                                }
                            });
                        }
                        else {
                            var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                            self.userloc = updatelocation;
                            data.distance = -1;
                            self.usersInRadiusArray.push(data);
                            self.populateData();
                        }
                    });
                });
            });
        }, 3000);
    };
    HomePage.prototype.showPopOver = function () {
        var _this = this;
        var options = {
            enableBackdropDismiss: false
        };
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__popover_popover__["a" /* PopoverPage */], options);
        popover.present();
        popover.onDidDismiss(function (data) {
            console.log(data);
            switch (data) {
                case 0:
                    _this.zoomScale = 5;
                    _this.selectedRadius = 1000;
                    _this.loadTheView();
                    break;
                case 5:
                    _this.zoomScale = 13;
                    _this.selectedRadius = 5;
                    _this.loadTheView();
                    break;
                case 10:
                    _this.zoomScale = 12;
                    _this.selectedRadius = 10;
                    _this.loadTheView();
                    break;
                case 15:
                    _this.zoomScale = 11;
                    _this.selectedRadius = 15;
                    _this.loadTheView();
                    break;
                default:
                    _this.zoomScale = 13;
                    _this.selectedRadius = 5;
                    _this.loadTheView();
                    break;
            }
        });
    };
    HomePage.prototype.populateData = function () {
        var _this = this;
        this.deleteMarkers();
        this.usersInRadiusArray.forEach(function (data) {
            if (data.uuid !== _this.deviceId) {
                var image = 'assets/imgs/location.png';
                var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                _this.addMarker(data, updatelocation, image);
                _this.setMapOnAll(_this.map);
            }
            else {
                var image = 'assets/imgs/userlocation.png';
                var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                _this.userloc = updatelocation;
                _this.addMarker(data, updatelocation, image);
                _this.setMapOnAll(_this.map);
            }
        });
    };
    HomePage.prototype.showInfo = function () {
        var alert = this.alertCtrl.create({
            title: 'App Info',
            subTitle: "This app is still in development stage. In case of marker issues, press refresh icon. Radius for search can be adjusted using the settings icon. If chat messages don't appear, restart the application!",
            buttons: ['Okay']
        });
        alert.present();
    };
    HomePage.prototype.calculateAndDisplayRoute = function (p1, p2) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _request = {
                origin: p1,
                destination: p2,
                travelMode: 'WALKING'
            };
            _this.directionsService.route(_request, function (_response, _status) {
                if (_status == google.maps.DirectionsStatus.OK) {
                    var point = _response.routes[0].legs[0];
                    var miles = point.distance.value * 0.000621371;
                    resolve(miles);
                }
                else {
                    resolve(-1);
                }
            });
        });
    };
    HomePage.prototype.addMarker = function (data, location, image) {
        var content;
        var imageUrl;
        if (data.imageUrl == null || data.imageUrl == "") {
            imageUrl = "./assets/imgs/profile-placeholder.png";
        }
        else {
            imageUrl = data.imageUrl;
        }
        if (data.uuid !== this.deviceId) {
            content = "<div style='display:block;'><img src='" + imageUrl + "' class='displayImage'><p class='dispName'>" + data.name + "</p></div><br /><p class='locText'>Distance: " + data.distance.toFixed(1) + " miles</p><p class='timeClass'>Last seen: " + getLastSeen(data.timestamp) + "</p><button id='moreButton'>Profile</button>";
        }
        else {
            content = "<div style='display:block;'><img src='" + imageUrl + "' class='displayImage'><p class='dispName'>" + data.name + "</p></div><br /><p class='locText'>This is your location</p><p class='timeClass'>Last seen: " + getLastSeen(data.timestamp) + "</p><button id='moreButton'>Profile</button>";
        }
        var infowindow = new google.maps.InfoWindow({
            content: content
        });
        var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            icon: image,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', toggleBounce);
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            }
            else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        var self = this;
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(self.map, marker);
            var moreButton = self.elementRef.nativeElement.querySelector("#moreButton");
            if (moreButton != null) {
                moreButton.addEventListener("click", function () {
                    console.log('Details clicked');
                    self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__profile_profile__["a" /* ProfilePage */], { "data": data });
                });
            }
        });
        this.markers.push(marker);
    };
    HomePage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    HomePage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    HomePage.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    HomePage.prototype.updateGeolocation = function (uuid, lat, lng) {
        var _this = this;
        this.deleteMarkers();
        var timestampNow = __WEBPACK_IMPORTED_MODULE_6_moment__().format("DD/MM/YYYY HH:mm");
        if (localStorage.getItem('mykey')) {
            __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('geolocations/' + localStorage.getItem('mykey')).set({
                uuid: uuid,
                latitude: lat,
                longitude: lng,
                name: this.userData.displayName,
                email: this.userData.email,
                imageUrl: this.userData.imageUrl,
                timestamp: timestampNow
            });
        }
        else {
            var array;
            var isPresentFlag = false;
            var keyIfPresent = "";
            var usersRef = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('geolocations/');
            usersRef.on('value', function (resp) {
                array = snapshotToArray(resp);
            });
            array.forEach(function (element) {
                if (element.uuid == _this.deviceId) {
                    isPresentFlag = true;
                    keyIfPresent = element.key;
                }
            });
            if (isPresentFlag == false) {
                var newData = this.ref.push();
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
            else {
                __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('geolocations/' + keyIfPresent).set({
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
    };
    HomePage.prototype.ionViewDidLeave = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Range Finder\n    </ion-title>\n    <ion-buttons left>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button ion-button class="refresh" (click)="loadTheView()"></button>\n      <button ion-button class="info" (click)="showInfo()"></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding id="homePage">\n  <div #map id="map"></div>\n  <button ion-button class="hoverButton" (click)="showPopOver()"></button>\n</ion-content>\n'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

function getLastSeen(time) {
    if (time != null) {
        var timeMoment = __WEBPACK_IMPORTED_MODULE_6_moment__(time, "DD/MM/YYYY HH:mm");
        // var currentMoment = moment();
        // var diffHours = currentMoment.diff(timeMoment,'hours');
        var returnString = timeMoment.fromNow();
        return returnString;
    }
    else {
        return "Unavailable";
    }
}
var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatDetailPage; });
/* unused harmony export snapshotToMessagesArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatDetailPage = /** @class */ (function () {
    function ChatDetailPage(eleRef, navCtrl, navParams, device) {
        var _this = this;
        this.eleRef = eleRef;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.receiverData = this.navParams.get("data");
        this.messages = new Array();
        this.receiveruuid = this.receiverData.uuid;
        this.tablename = this.receiverData.tableName;
        this.receiverName = this.receiverData.receiverName;
        this.senderName = localStorage.getItem('displayName');
        this.ref = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('chatrooms/' + this.tablename + '/messages');
        this.usersRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('chatrooms/' + this.tablename + '/users');
        this.ref.on('value', function (resp) {
            _this.rooms = [];
            _this.rooms = snapshotToMessagesArray(resp);
            _this.populateData();
        });
    }
    ChatDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatDetailPage');
        this.scrollMessageDivToBottom();
    };
    ChatDetailPage.prototype.populateData = function () {
        // this.rooms.forEach(message => {
        //   this.messages.push(message[message.key]);
        // }); 
        var _this = this;
        this.rooms.forEach(function (message) {
            if (message.from != _this.device.uuid) {
                message.align = "left";
            }
            else {
                message.align = "right";
            }
        });
        this.messages = this.rooms;
    };
    ChatDetailPage.prototype.scrollMessageDivToBottom = function () {
        var messageDiv = this.eleRef.nativeElement.querySelector(".chatList");
        messageDiv.scrollTo(0, messageDiv.scrollHeight);
    };
    ChatDetailPage.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    ChatDetailPage.prototype.getDateStamp = function (tStamp) {
        var time = __WEBPACK_IMPORTED_MODULE_3_moment__(tStamp, "MMM Do YYYY, hh:mm a").format("MMM Do YYYY");
        return time;
    };
    ChatDetailPage.prototype.getTimeStamp = function (tStamp) {
        var time = __WEBPACK_IMPORTED_MODULE_3_moment__(tStamp, "MMM Do YYYY, hh:mm a").format("hh:mm a");
        return time;
    };
    ChatDetailPage.prototype.sendMessage = function () {
        var messageTstamp = __WEBPACK_IMPORTED_MODULE_3_moment__().format("MMM Do YYYY, hh:mm a");
        this.messageText = String(this.messageText).trim();
        if (this.messageText != "") {
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
    };
    ChatDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat-detail',template:/*ion-inline-start:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/chat-detail/chat-detail.html"*/'<!--\n  Generated template for the ChatDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{this.receiverName}}</ion-title>\n    <ion-buttons left>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content id="chatDetail">\n  <ion-list class="chatList">\n    <ion-item *ngFor="let messageObj of messages" class="chatItem">\n      <span class="tStamp">{{this.getDateStamp(messageObj.tStamp)}}</span>\n      <div [ngClass]="messageObj.align == \'right\' ? \'alignRight\' : \'alignLeft\'">\n        <span class="messageStyle">{{messageObj.message}}</span>\n        <span class="timeString">{{this.getTimeStamp(messageObj.tStamp)}}</span>\n      </div>\n    </ion-item>\n  </ion-list>\n  <span class="footer">\n    <ion-input type="text" placeholder="Type your message here" [(ngModel)]="messageText" class="messageTextInput"></ion-input>\n    <button ion-button class="sendButton" (click)="sendMessage()">Send</button>\n  </span>\n</ion-content>\n'/*ion-inline-end:"/Users/krishnarohit/Desktop/RangeFinder - base/rangefinder-tracking/src/pages/chat-detail/chat-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */]])
    ], ChatDetailPage);
    return ChatDetailPage;
}());

var snapshotToMessagesArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
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
//# sourceMappingURL=chat-detail.js.map

/***/ })

},[411]);
//# sourceMappingURL=main.js.map