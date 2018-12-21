import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	segment: 'gio-hang'
})
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  totalAmount: number = 0;
  isCartItemLoaded: boolean = false;
  isEmptyCart: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadCartItems();
  }

  loadCartItems() {
    let loader = this.loadingCtrl.create({
      content: "Đang tải..."
    });
    loader.present();
    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.totalAmount += parseInt(v.totalPrice);
          });
          this.isEmptyCart = false;
        }
        this.isCartItemLoaded = true;
      })
      .catch(err => {});
    loader.dismiss();
  }

  checkOut() {
    var user = true;
    if (user) {
      this.navCtrl.push("CheckoutPage");
    } else {
      this.navCtrl.setRoot("LoginPage");
    }
  }

  removeItem(itm) {
    this.cartService.removeFromCart(itm).then(() => {
      this.loadCartItems();
    });
  }

}
