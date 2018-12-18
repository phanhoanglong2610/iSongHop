/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Product" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or an "Animal," or something like that.
 *
 * The Categories service manages creating instances of Product, so go ahead and rename
 * that something that fits your app as well.
 */
export class Product {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface Product {
  [prop: string]: any;
}
