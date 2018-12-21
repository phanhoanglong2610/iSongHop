import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';

import { UserProvider } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'cust1@alohaspa.vn',
    password: '123456'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public userService: UserProvider,
    public toastCtrl: ToastController,
    public forgotCtrl: AlertController,
    public translateService: TranslateService
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our UserProvider service
  doLogin() {
    this.userService.login(this.account).subscribe((res) => {
      // this.navCtrl.pop();
      this.navCtrl.setRoot('AlohaPage');
    }, (err) => {
      this.navCtrl.setRoot('AlohaPage');
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 2000,
        position: 'bottom '
      });
      toast.present();
    });
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Quên mật khẩu?',
      message: "Nhập email của bạn:",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Hủy',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Gửi',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Vui lòng kiểm tra email của bạn.',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
}
