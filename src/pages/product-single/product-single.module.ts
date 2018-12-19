import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSinglePage } from './product-single';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    ProductSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductSinglePage),
    HeaderPageModule,
    FooterPageModule,
    TranslateModule.forChild()
  ],
  exports: [
  	ProductSinglePage
  ]
})
export class ProductSinglePageModule {}
