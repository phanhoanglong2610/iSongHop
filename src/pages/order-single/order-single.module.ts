import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSinglePage } from './order-single';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    OrderSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSinglePage),
    HeaderPageModule,
    FooterPageModule,
    TranslateModule.forChild()
  ],
  exports: [
  	OrderSinglePage
  ]
})
export class OrderSinglePageModule {}
