import { Injectable } from '@angular/core';

import { Category } from '../../models/category';
import { Api } from '../api/api';

@Injectable()
export class Categories {

  constructor(public api: Api) { }

  query(params?: any) {
  	var cat_id = params["cat_id"];
  	return this.api.get('categories-' + cat_id, params);
  }

  add(category: Category) {
  }

  delete(category: Category) {
  }

}
