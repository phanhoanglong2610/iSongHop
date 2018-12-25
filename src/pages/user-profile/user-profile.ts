import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { UserProvider } from '../../providers/user/user';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  segment: 'ho-so'
})
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
  user: any;
  userProfile: any;
  currentPoints: any[] = [];

  constructor(public navCtrl: NavController,
    public items: UserProvider,
    public modalCtrl: ModalController,
    private commonSrv: CommonProvider,
    private clipboard: Clipboard,
    public navParams: NavParams
    ) {
    this.user = this.commonSrv.getUser();
    this.userProfile = this.commonSrv.getUserProfile();
    this.currentPoints.push({"name": "Ví B", "point": this.userProfile.zb});
    this.currentPoints.push({"name": "Ví C1", "point": this.userProfile.zc1});
    this.currentPoints.push({"name": "Ví C2", "point": this.userProfile.zc2});
    this.currentPoints.push({"name": "Ví D1", "point": this.userProfile.zd1});
    this.currentPoints.push({"name": "Ví D2", "point": this.userProfile.zd2});
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  copyRefCode(){
    this.clipboard.copy(this.userProfile.ref);
  }
 
  copyRefLink(){
    this.clipboard.copy('http://alohaspan.vn/signup?ref=' + this.userProfile.ref);
  }
 
}
