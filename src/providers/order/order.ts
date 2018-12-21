import { Injectable } from '@angular/core';

import { Order } from '../../models/order';
import { Api } from '../api/api';
import { CommonProvider } from '../../providers/common/common';

export const ORDER_NEW = "New";

@Injectable()
export class OrderProvider {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/orders', params);
  }

  add(item: Order) {
    let orderObject = item;
    orderObject.orderRef = this.makeOrderRef(10);
    orderObject.orderStatus = ORDER_NEW;

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

}
