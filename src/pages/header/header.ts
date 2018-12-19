import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';


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

  constructor(public navCtrl: NavController, private commonSrv: CommonProvider) { }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

  signIn() {
    this.navCtrl.push('LoginPage');
  }

  showSearch(){
    this.commonSrv.presentToast('Chức năng chưa hoàn thiện!');
  }

  showCart(){
  	this.navCtrl.push('CartPage');
  }

  
}
