import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * The Footer Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Footer page.
*/
@IonicPage({
	'name': 'footer',
	'segment': 'footer'
})
@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html'
})
export class FooterPage {

  constructor(public navCtrl: NavController) { }

  signout() {
    this.navCtrl.push('SignupPage');
  }
}
