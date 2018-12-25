import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderProvider } from '../../providers/order/order';
import { CommonProvider } from '../../providers/common/common';

@IonicPage({
  segment: 'don-hang'
})
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {
  currentOrders: Order[];
  user: any;
  cat_name: string;

  constructor(public navCtrl: NavController,
    public items: OrderProvider,
    public modalCtrl: ModalController,
    private commonSrv: CommonProvider,
    public navParams: NavParams) {
    this.user = this.commonSrv.getUser();
    var filter_params = navParams.get("filter");
    if (filter_params){
      this.items.filter({filter: filter_params}).subscribe(data => {
        this.currentOrders = data;
      });  
    }
    else{
      this.items.query({userId: this.user.id}).subscribe(data => {
        this.currentOrders = data;
      });  
    }
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our OrderCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('OrderCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Order) {
    this.navCtrl.push('OrderSinglePage', {
      order: item,
      slug: item.slug
    });
  }
}
