import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { UserProvider } from '../user/user';
import { Storage } from '@ionic/storage';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  COMMON_CITIES = [
    "Hà Nội",
    "Thành phố Hồ Chí Minh",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Cần Thơ",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hoà Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái"
  ]

  STAR_SELECTION = [1,2,3,4,5]

  constructor(public http: HttpClient,
    public toastCtrl: ToastController,
    private userService: UserProvider,
    public storage: Storage
    ) {
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Đóng'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  isLoggedIn(){
    return this.userService.isLoggedIn();
  }

  logout(){
    return this.userService.logout();
  }

  getUser(){
    return this.userService._user;
  }

  getRole(){
    return this.userService.getRole();
  }

  isManager(){
    return this.userService.isManager();
  }

  isStaff(){
    return this.userService.isStaff();
  }

  isShipper(){
    return this.userService.isShipper();
  }

  isUser(){
    return this.userService.isUser();
  }

}
