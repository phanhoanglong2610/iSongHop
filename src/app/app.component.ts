import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { CommonProvider } from '../providers/common/common';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;
  user: any;
  userRole: string;
  pages: any[] = [];

  @ViewChild(Nav) nav: Nav;

  pages_guest: any[] = [
    { title: 'Home', component: 'AlohaPage', params: {cat_id: 0, cat_name: ""}},
    { title: 'Dịch vụ Spa', component: 'CategoryListPage', params: {cat_id: 1, cat_name: 'Dịch vụ Spa', slug: 'dich-vu-spa'}},
    { title: 'Mỹ phẩm cao cấp', component: 'CategoryListPage', params: {cat_id: 2, cat_name: 'Mỹ phẩm cao cấp', slug: 'my-pham-cao-cap'}},
    { title: 'Tin tức', component: 'AlohaPage'},
    { title: 'Về chúng tôi', component: 'WelcomePage' },
    { title: 'Đăng kí', component: 'LoginPage' },
    { title: 'Đăng nhập', component: 'SignupPage' },
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' },
  ]

  pages_manager: any[] = [];
  pages_staff: any[] = [];
  pages_shipper: any[] = [];

  pages_user: any[] = [
    { title: 'Home', component: 'AlohaPage', params: {cat_id: 0, cat_name: ""}},
    { title: 'Dịch vụ Spa', component: 'CategoryListPage', params: {cat_id: 1, cat_name: 'Dịch vụ Spa', slug: 'dich-vu-spa'}},
    { title: 'Mỹ phẩm cao cấp', component: 'CategoryListPage', params: {cat_id: 2, cat_name: 'Mỹ phẩm cao cấp', slug: 'my-pham-cao-cap'}},
    { title: 'Tin tức', component: 'AlohaPage'},
    { title: 'Về chúng tôi', component: 'WelcomePage' },
    { title: 'Sản phẩm yêu thích', component: 'AlohaPage'},
    { title: 'Đơn hàng', component: 'AlohaPage'},
    { title: 'Điểm thành viên', component: 'AlohaPage'},
    { title: 'Giới thiệu khách', component: 'AlohaPage'},
    { title: 'Đăng xuất', component: 'AlohaPage'},
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private commonSrv: CommonProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  ngAfterViewInit() {
    this.nav.viewDidEnter.subscribe((data) => {
      this.user = this.commonSrv.getUser();
      this.userRole = this.commonSrv.getRole();
      switch (this.userRole){
        case 'Admin':
          this.pages = this.pages_admin;
          break;
        case 'Manager':
          this.pages = this.pages_manager;
          break;
        case 'Shipper':
          this.pages = this.pages_shipper;
          break;
        case 'User':
          this.pages = this.pages_user;
          break;
        default:
          this.pages = this.pages_guest;
          break;
      }
    });
  }

  ionViewCanEnter(){
    
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.params);
  }
}
