import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api/api';


import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { CommonProvider } from '../../providers/common/common';
import { CartProvider } from '../../providers/cart/cart';
import { Order } from '../../models/order';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the OrderSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'chi-tiet-don-hang'
})
@Component({
  selector: 'page-order-single',
  templateUrl: 'order-single.html',
})
export class OrderSinglePage {
  // Order Info
	selectOrder: any;
  cartItems: any[];
  inFav: boolean = false;
  isLoggedIn: boolean = false;
  starSelection: any[] = [];

  // Form Info
  reviewForm: FormGroup;
  reviewContent: string;
  reviewStar: number;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
    private commonSrv: CommonProvider,
    private cartService: CartProvider,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public orderService: OrderProvider,
    public api: Api
  ) {
    if (this.navParams.get("order")) {
      window.localStorage.setItem('selectedOrder', JSON.stringify(this.navParams.get("order")));
    } 
    this.starSelection = this.commonSrv.STAR_SELECTION;
    this.reviewForm = this.formBuilder.group({
      reviewStar: [this.reviewStar],
      reviewContent: [this.reviewContent]
    });
    this.isLoggedIn = this.commonSrv.isLoggedIn();
  }
  ionViewDidEnter(){
  	this.getSingleOrder();
  }

  getSingleOrder() {
    if (window.localStorage.getItem('selectedOrder') != 'undefined') {
      this.selectOrder = JSON.parse(window.localStorage.getItem('selectedOrder'))
    }
  }

  ionViewDidLoad() {
    this.selectOrder = this.navParams.get("order");
    this.cartItems = this.selectOrder.cartItems;
  }

  sendReview(){
    var formValues = this.reviewForm.value;
    formValues.user = this.commonSrv.getUser().id;
    if (!this.selectOrder.reviews)
      this.selectOrder.reviews = [formValues]
    else
      this.selectOrder.reviews.push(formValues);
    let seq = this.api.put('orders/' + this.selectOrder.id, this.selectOrder).share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        console.log("Added review");
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;    
  }

  openItem(item: Order) {
    this.navCtrl.push('OrderSinglePage', {
      order: item,
      slug: item.slug
    });
  }

}

