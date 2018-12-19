import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


/**
 * The Header Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Header page.
*/
@IonicPage({
	'name': 'header',
	'segment': 'header'
})
@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class HeaderPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) { }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

  signIn() {
    this.navCtrl.push('LoginPage');
  }

  showSearch(){
    this.presentToast('Chức năng chưa hoàn thiện!');
  }

  showCart(){
  	this.navCtrl.push('CartPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Đóng'
    });

    toast.onDidDismiss(() => {
      
    });

    toast.present();
  }
}
