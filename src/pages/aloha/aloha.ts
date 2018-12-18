import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Category } from '../../models/category';
import { Categories } from '../../providers';

/**
 * The Aloha Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Aloha page.
*/
@IonicPage()
@Component({
  selector: 'page-aloha',
  templateUrl: 'aloha.html'
})
export class AlohaPage {

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

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
