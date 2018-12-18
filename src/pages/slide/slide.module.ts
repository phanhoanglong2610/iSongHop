import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SlidePage } from './slide';

@NgModule({
  declarations: [
    SlidePage,
  ],
  imports: [
    IonicPageModule.forChild(SlidePage),
    TranslateModule.forChild()
  ],
  exports: [
    SlidePage
  ]
})
export class SlidePageModule { }
