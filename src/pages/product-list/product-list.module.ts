import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProductListPage } from './product-list';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
    HeaderPageModule,
    FooterPageModule,
    TranslateModule.forChild()
  ],
  exports: [
    ProductListPage
  ]
})
export class ProductListPageModule { }
