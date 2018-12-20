import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { CartProvider } from '../../providers/cart/cart';
import { Product } from '../../models/product';
import { Products } from '../../providers';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ProductSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'san-pham/:slug'
})
@Component({
  selector: 'page-product-single',
  templateUrl: 'product-single.html',
})
export class ProductSinglePage {
	selectProduct: any;
  productCount: number = 1;
  cartItems: any[];
  inFav: boolean = false;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
    private commonSrv: CommonProvider,
    private cartService: CartProvider
  ) {
    if (this.navParams.get("product")) {
      window.localStorage.setItem('selectedProduct', JSON.stringify(this.navParams.get("product")));
    } 
  }
  ionViewDidEnter(){
  	this.getSingleProduct();
  }

  getSingleProduct() {
    if (window.localStorage.getItem('selectedProduct') != 'undefined') {
      this.selectProduct = JSON.parse(window.localStorage.getItem('selectedProduct'))
    }
  }
 
  ionViewDidLoad() {
    this.selectProduct = this.navParams.get("product");
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
    })
  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--;
    }
  }

  incrementProductCount() {
    this.productCount++;
  }

  addToCart(product) {
    var productPrice = this.productCount * parseInt(product.price);
    let cartProduct = {
      product_id: product.id,
      name: product.name,
      picture: product.picture,
      count: this.productCount,
      totalPrice: productPrice
    };
    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
    });
  }

  presentToast(name) {
    let toast = this.toastCtrl.create({
      message: `Đã thêm vào giỏ hàng: ${name}`,
      showCloseButton: true,
      closeButtonText: 'Xem giỏ hàng'
    });
    toast.onDidDismiss(() => {
      this.navCtrl.push('CartPage');
    });
    toast.present();
  }

  toggleWishList(){
    this.inFav = !this.inFav;
    var action = this.inFav ? "thêm vào" : "xóa khỏi";
    this.commonSrv.presentToast("Đã " + action + "   mục ưa thích.");
  }
}
