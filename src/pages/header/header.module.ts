import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { HeaderPage } from './header';

@NgModule({
  declarations: [
    HeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(HeaderPage),
    TranslateModule.forChild()
  ],
  exports: [
    HeaderPage
  ]
})
export class HeaderPageModule { }
