import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutPage),
    HeaderPageModule,
    FooterPageModule,
    TranslateModule.forChild()
  ],
  exports: [
  	CheckoutPage
  ]
})
export class CheckoutPageModule {}
