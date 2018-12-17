import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * The Aloha Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Aloha page.
*/
@IonicPage()
@Component({
  selector: 'page-aloha',
  templateUrl: 'aloha.html'
})
export class AlohaPage {

  constructor(public navCtrl: NavController) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
