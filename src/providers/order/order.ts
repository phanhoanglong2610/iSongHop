import { Injectable } from '@angular/core';

import { Order } from '../../models/order';
import { Api } from '../api/api';

@Injectable()
export class OrderProvider {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/orders', params);
  }

  add(item: Order) {
    var promise = new Promise((resolve, reject) => {
    	let orderRef = this.makeid(10);
    	let orderObject = {
     		orderRef: orderRef,
  		  customerName:item.customerName || '',
  		  shippingFee:item.shippingFee,
  		  productAmt:item.productAmt,
  		  totalAmount: item.totalAmount,
        cartItems: item.cartItems
  		};
  		console.log(orderObject);
  		console.log("Call API to place order");
      resolve(true);
    });
    return promise;
  }

  delete(item: Order) {
  }

  makeid(length:number) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
