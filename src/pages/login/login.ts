import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { UserProvider } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, customerName: string, password: string } = {
    email: 'test@example.com',
    customerName: 'Long Phan',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our UserProvider service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      // this.navCtrl.pop();
      this.navCtrl.setRoot('AlohaPage');
    }, (err) => {
      this.navCtrl.setRoot('AlohaPage');
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'bottom '
      });
      toast.present();
    });
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }
}
