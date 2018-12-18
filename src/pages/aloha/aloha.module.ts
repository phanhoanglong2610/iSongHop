import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AlohaPage } from './aloha';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';
import { SlidePageModule } from '../slide/slide.module';

@NgModule({
  declarations: [
    AlohaPage,
  ],
  imports: [
    IonicPageModule.forChild(AlohaPage),
    HeaderPageModule,
    FooterPageModule,
    SlidePageModule,
    TranslateModule.forChild()
  ],
  exports: [
    AlohaPage
  ]
})
export class AlohaPageModule { }
