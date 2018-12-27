import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { CartProvider } from '../../providers/cart/cart';

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
  noOfCartItems: number = 0;
  isLoggedIn: boolean = false;
  currentUser: any;

  constructor(public navCtrl: NavController,
    private commonSrv: CommonProvider,
    private cartService: CartProvider
  ) { 
    this.cartService
      .getCartItems()
      .then(val => {
        this.noOfCartItems = val.length;
      });
    this.commonSrv.getUserFromStorage().then(user => {
      if (user){
        this.isLoggedIn = true;
        this.currentUser = user;
      }
      else{
        this.isLoggedIn = false;
      }
    });
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

  signIn() {
    this.navCtrl.push('LoginPage');
  }

  signOut() {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.commonSrv.logout();
    this.navCtrl.setRoot('AlohaPage');
    this.commonSrv.presentToast("Bạn đã đăng xuất thành công.");
  }

  showSearch(){
    this.commonSrv.presentToast('Chức năng chưa hoàn thiện!');
  }

  showCart(){
  	this.navCtrl.push('CartPage');
  }

}
