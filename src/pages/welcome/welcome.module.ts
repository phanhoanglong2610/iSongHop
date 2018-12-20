import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { WelcomePage } from './welcome';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    WelcomePage
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    HeaderPageModule,
    FooterPageModule,
    TranslateModule.forChild()
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomePageModule { }
