import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AlohaPage } from './aloha';
import { HeaderPage } from '../header/header';

@NgModule({
  declarations: [
    AlohaPage,
    HeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(AlohaPage),
    TranslateModule.forChild()
  ],
  exports: [
    AlohaPage
  ]
})
export class AlohaPageModule { }
