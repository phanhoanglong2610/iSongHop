import { Injectable } from '@angular/core';

import { Product } from '../../models/product';
import { Api } from '../api/api';

@Injectable()
export class Products {

  constructor(public api: Api) { }

  query(params?: any) {
  	var cat_id = params["cat_id"];
  	return this.api.get('products-cat-id-' + cat_id, params);
  }

  add(product: Product) {
  }

  delete(product: Product) {
  }

}
