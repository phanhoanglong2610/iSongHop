import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FooterPage } from './footer';

@NgModule({
  declarations: [
    FooterPage,
  ],
  imports: [
    IonicPageModule.forChild(FooterPage),
    TranslateModule.forChild()
  ],
  exports: [
    FooterPage
  ]
})
export class FooterPageModule { }
