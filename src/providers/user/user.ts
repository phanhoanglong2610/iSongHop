import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Api } from '../api/api';

const USER_KEY = "currentUser";

/**
 * Most apps have the concept of a UserProvider. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This UserProvider provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // UserProvider fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserProvider {
  _user: any;
  _user_profile: any;

  constructor(public api: Api, public storage: Storage) { 
    this.storage.get(USER_KEY).then(user => {
      this._user = user;
      this.setUserProfile();
    })
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    // let seq = this.api.post('login', accountInfo).share();
    let seq = this.api.get('users?email=' + accountInfo.email);

    seq.subscribe((res: any) => {
      this.setLoggedIn(res[0]);
      this.setUserProfile();
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('users', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this.setLoggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  setUserProfile(){
    var user_id = this.getUser().id;
    let seq2 = this.api.get('user_profiles?userId=' + user_id);

    seq2.subscribe((res: any) => {
      this._user_profile= res[0];
    }, err => {
      console.error('ERROR', err);
    });
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.storage.remove(USER_KEY);
    this._user = null;
    this._user_profile = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  setLoggedIn(res) {
    this._user = res;
    this.storage.set(USER_KEY, res);
  }

  isLoggedIn(){
    return !!this._user;
  }

  isManager(){
    return this._user.role == 1;
  }
  isStaff(){
    return this._user.role == 2;
  }
  isShipper(){
    return this._user.role == 3;
  }
  isUser(){
    return this._user.role == 4;
  }

  getRole(){
    if (!this.isLoggedIn()) return "Guest";
    if (this.isManager()) return 'Manager';
    if (this.isStaff()) return 'Staff';
    if (this.isShipper()) return 'Shipper';
    if (this.isUser()) return 'User';
    return "Guest";
  }

  getUserProfile() {
    return this._user_profile;
  }

  getUser(){
    return this._user;
  }

  getUserFromStorage(){
    return this.storage.get(USER_KEY);
  }

}
