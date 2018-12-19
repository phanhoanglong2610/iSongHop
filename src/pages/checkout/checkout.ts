import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from "ionic-angular";

import {
  FormBuilder,
  FormGroup,
  FormControl
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
  cartItems: any[] = [];
  productAmt: number = 0;
  totalBaseAmount: number = 0;
  totalAmount: number = 0;
  shippingFee: number = 20000;
  customerName: any;
  couponAmount: number = 0;
  couponCode: '';

  checkoutForm: FormGroup;
  checkoutMethod;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    private orderService: OrderProvider,
    private commonSrv: CommonProvider,
    private formBuilder: FormBuilder
  ) {
    this.loadCartItems();
    this.checkoutForm = this.formBuilder.group({
      couponCode: [this.couponCode],
      "checkoutMethod": new FormControl({value: 'cod'})
    });
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

  ionViewDidLoad() {
    this.customerName = "Khách";
  }

  ionViewWillEnter() {
    var user = true;
    if (!user) this.navCtrl.setRoot("LoginPage");
  }

  ionViewCanEnter() {}

  placeOrder() {
    console.log(this);
  }

  placeOrder2() {
    let loader = this.loadingCtrl.create({
      content: "Đang đặt hàng..."
    });
    loader.present();
    var user = true;
    if (user) {
      let orderObj = {
        customerId: 1,
        customerName: this.customerName,
        shippingFee: this.shippingFee,
        productAmt: this.productAmt,
        totalAmount: this.totalAmount,
        cartItems: this.cartItems
      };

      this.orderService.add(orderObj).then(() => {
        loader.dismiss();
        this.navCtrl.setRoot('HomePage');
      });
    } else {
      loader.dismiss();
    }
  }

  checkCoupon(){
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
}