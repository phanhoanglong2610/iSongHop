import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * The Slide Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Slide page.
*/
@IonicPage({
	'name': 'slide',
	'segment': 'slide'
})
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html'
})
export class SlidePage {

  constructor(public navCtrl: NavController) { }

  signout() {
    this.navCtrl.push('SignupPage');
  }
}
