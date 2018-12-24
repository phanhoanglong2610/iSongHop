import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api/api';


import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { CommonProvider } from '../../providers/common/common';
import { CartProvider } from '../../providers/cart/cart';
import { Product } from '../../models/product';
import { Products } from '../../providers';

/**
 * Generated class for the ProductSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'san-pham/:slug'
})
@Component({
  selector: 'page-product-single',
  templateUrl: 'product-single.html',
})
export class ProductSinglePage {
  // Product Info
	selectProduct: any;
  productCount: number = 1;
  cartItems: any[];
  inFav: boolean = false;
  isLoggedIn: boolean = false;
  starSelection: any[] = [];

  // Other Products
  relatedProducts: any[] = [];
  featuredProducts: any[] = [];
  newProducts: any[] = [];

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
    public productService: Products,
    public api: Api
  ) {
    if (this.navParams.get("product")) {
      window.localStorage.setItem('selectedProduct', JSON.stringify(this.navParams.get("product")));
    } 
    this.starSelection = this.commonSrv.STAR_SELECTION;
    this.reviewForm = this.formBuilder.group({
      reviewStar: [this.reviewStar],
      reviewContent: [this.reviewContent]
    });
    this.isLoggedIn = this.commonSrv.isLoggedIn();
  }
  ionViewDidEnter(){
  	this.getSingleProduct();
    this.getRelatedProducts(this.selectProduct.cat_id);
  }

  getSingleProduct() {
    if (window.localStorage.getItem('selectedProduct') != 'undefined') {
      this.selectProduct = JSON.parse(window.localStorage.getItem('selectedProduct'))
    }
  }

  getRelatedProducts(cat_id){
    var product_cat_id = cat_id || 12;
    this.productService.query({cat_id: product_cat_id}).subscribe(data => {
      this.relatedProducts = data;
      this.featuredProducts = data;
    })
  }
 
  ionViewDidLoad() {
    this.selectProduct = this.navParams.get("product");
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
    })
  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--;
    }
  }

  incrementProductCount() {
    this.productCount++;
  }

  addToCart(product) {
    var productPrice = this.productCount * parseInt(product.price);
    let cartProduct = {
      product_id: product.id,
      name: product.name,
      picture: product.picture,
      count: this.productCount,
      totalPrice: productPrice
    };
    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
    });
  }

  sendReview(){
    var formValues = this.reviewForm.value;
    formValues.user = this.commonSrv.getUser().id;
    this.selectProduct.reviews.push(formValues);
    let seq = this.api.put('products-cat-id-11/' + this.selectProduct.id, this.selectProduct).share();

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        console.log("Added review");
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;    
  }

  presentToast(name) {
    let toast = this.toastCtrl.create({
      message: `Đã thêm vào giỏ hàng: ${name}`,
      showCloseButton: true,
      closeButtonText: 'Xem giỏ hàng'
    });
    toast.onDidDismiss(() => {
      this.navCtrl.push('CartPage');
    });
    toast.present();
  }

  toggleWishList(){
    this.inFav = !this.inFav;
    var action = this.inFav ? "thêm vào" : "xóa khỏi";
    this.commonSrv.presentToast("Đã " + action + "   mục ưa thích.");
  }

  clickShare(){
    this.commonSrv.presentToast('Chức năng chưa hoàn thiện!');
  }

  openItem(item: Product) {
    this.navCtrl.push('ProductSinglePage', {
      product: item,
      slug: item.slug
    });
  }

}

