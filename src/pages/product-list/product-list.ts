import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Product } from '../../models/product';
import { Products } from '../../providers';

@IonicPage({
  segment: ':slug/san-pham'
})
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html'
})
export class ProductListPage {
  currentProducts: Product[];
  cat_id: number = 0;
  cat_name: string;

  constructor(public navCtrl: NavController, public items: Products, public modalCtrl: ModalController, public navParams: NavParams) {
    this.cat_id = navParams.get("cat_id") || this.cat_id;
    this.cat_name = navParams.get("cat_name");
    var filter_params = navParams.get("filter");
    if (filter_params){
      this.items.filter({filter: filter_params}).subscribe(data => {
        this.currentProducts = data;
      });  
    }
    else{
      this.items.query({cat_id: this.cat_id}).subscribe(data => {
        this.currentProducts = data;
      });  
    }
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ProductCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ProductCreatePage');
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
  openItem(item: Product) {
    this.navCtrl.push('ProductSinglePage', {
      product: item,
      slug: item.slug
    });
  }
}
