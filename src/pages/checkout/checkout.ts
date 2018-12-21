import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,  LoadingController } from 'ionic-angular';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { CommonProvider } from '../../providers/common/common';
import { CartProvider } from "../../providers/cart/cart";
import { OrderProvider } from "../../providers/order/order";

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  // Cart Info
  cartItems: any[] = [];
  citySelection: any[] = [];
  productAmt: number = 0;
  totalBaseAmount: number = 0;
  totalAmount: number = 0;
  shippingFee: number = 20000;
  couponAmount: number = 0;
  couponCode: '';

  // Form Info
  checkoutForm: FormGroup;
  checkoutMethod: string = 'cod';
  customerName: any;
  shippingPhone: string;
  shippingEmail: string;
  shippingCity: string;
  shippingAddress: string;
  shippingNote: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    private orderService: OrderProvider,
    private commonSrv: CommonProvider,
    private formBuilder: FormBuilder
  ) {
    this.citySelection = this.commonSrv.COMMON_CITIES;
  }

  ionViewCanEnter() {
    var user = this.commonSrv.getUser();
    if (!user) this.navCtrl.setRoot("LoginPage");
    if (!this.customerName) this.customerName = user ? user.name : 'Khách';
    this.loadCartItems();
    this.loadFormItems();
  }

  loadCartItems() {
    let loader = this.loadingCtrl.create({
      content: "Đang tải..."
    });
    loader.present();
    this.cartService.getCartItems().then(val => {
        this.cartItems = val;

        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.productAmt += parseInt(v.totalPrice);
          });
          this.totalAmount = this.productAmt + this.shippingFee;
          this.totalBaseAmount = this.totalAmount;
        }
      })
      .catch(err => {});
    loader.dismiss();
  }

  loadFormItems(){
    this.checkoutForm = this.formBuilder.group({
      couponCode: [this.couponCode],
      checkoutMethod: [this.checkoutMethod],
      customerName: [this.customerName],
      shippingPhone: [this.shippingPhone],
      shippingEmail: [this.shippingEmail],
      shippingCity: [this.shippingCity],
      shippingAddress: [this.shippingAddress],
      shippingNote: [this.shippingNote]
    });
  }

  placeOrder2() {
    console.log(this);
  }

  placeOrder() {
    let loader = this.loadingCtrl.create({
      content: "Đang đặt hàng..."
    });
    loader.present();
    var user = this.commonSrv.getUser();
    if (user) {
      let orderObj = this.checkoutForm.value;
      orderObj.accountId = user.id;
      orderObj.accountName = user.name;
      orderObj.shippingFee = this.shippingFee;
      orderObj.productAmt = this.productAmt;
      orderObj.totalBaseAmount = this.totalBaseAmount;
      orderObj.totalAmount = this.totalAmount;
      orderObj.cartItems = this.cartItems;
      
      this.orderService.add(orderObj).subscribe(() => {
        // this.navCtrl.setRoot('AlohaPage');
        loader.dismiss();
        this.commonSrv.presentToast('Đặt hàng thành công.');
      });
    } else {
      loader.dismiss();
    }
  }

  checkCoupon(){
    console.log(this);
    var couponCode = this.checkoutForm.value.couponCode;
    if (couponCode == 'Dung'){
      this.commonSrv.presentToast('Coupon hợp lệ');
      this.couponAmount = 1000;
      this.totalAmount -= this.couponAmount;
    }
    else{
      this.commonSrv.presentToast('Coupon không hợp lệ');
      this.couponAmount = 0;
      this.totalAmount = this.totalBaseAmount;
    }
    this.couponCode = couponCode;
  }

  goToCart() {
    this.navCtrl.setRoot("CartPage");
  }
}
