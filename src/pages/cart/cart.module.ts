import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
    HeaderPageModule,
    FooterPageModule,
    TranslateModule.forChild()
  ],
  exports: [
  	CartPage
  ]
})
export class CartPageModule {}
