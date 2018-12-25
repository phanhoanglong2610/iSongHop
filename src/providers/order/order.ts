import { Injectable } from '@angular/core';

import { Order } from '../../models/order';
import { CommonProvider } from '../../providers/common/common';
import { Api } from '../api/api';

const ORDER_NEW = "New";

@Injectable()
export class OrderProvider {
  user: any;

  constructor(public api: Api, private commonSrv: CommonProvider) {
    this.user = this.commonSrv.getUser();
  }

  query(params?: any) {
    return this.api.get('orders', params);
  }

  filter(params?: any){
    var filter = params["filter"];
    return this.api.get('orders?' + filter, params);  
  }

  add(item: Order) {
    let orderObject = this.initOrder(item);
    let seq = this.api.post('orders', orderObject).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;

  }

  delete(item: Order) {
  }

  makeOrderRef(length:number) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  initOrder(item){
    let orderObject = item;
    orderObject.orderRef = this.makeOrderRef(10);
    orderObject.orderStatus = ORDER_NEW;
    orderObject.orderStar = 5;
    orderObject.orderReview = "Good";
    orderObject.userId = this.user.id;
    return orderObject;
  }

}
