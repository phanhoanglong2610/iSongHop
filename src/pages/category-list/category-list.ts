import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Category } from '../../models/category';
import { Categories } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage {
  currentCategories: Category[];
  cat_id: int = 0;
  cat_name: string;

  constructor(public navCtrl: NavController, public items: Categories, public modalCtrl: ModalController, public navParams: NavParams) {
    this.cat_id = navParams.get("cat_id") || this.cat_id;
    this.cat_name = navParams.get("cat_name");
    this.items.query({cat_id: this.cat_id}).subscribe(data => {
      this.currentCategories = data;
    });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our CategoryCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('CategoryCreatePage');
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
  openItem(item: Category) {
    this.navCtrl.push('CategoryDetailPage', {
      item: item
    });
  }
}
