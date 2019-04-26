import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthService{
  currentUser: {};
  login_timeOut: any;

  constructor(private http: HttpClient, private router: Router){
  }

  GetHttpHeaders() : HttpHeaders{
    const headers = new HttpHeaders({"Content-Type": "application/json", 'Accept': "application/vnd.myapp.v1"});
    return headers;
  }

   
  signUp(userInfo: any) {
      const url = environment.apiUrl + "/users";
      const body = {user: {data: {attributes: userInfo }}}
      return this.http.post(url, body, { headers: this.GetHttpHeaders() }).pipe(map(data => {
        if (data ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
             const userStr = JSON.parse(JSON.stringify(data));
             this.currentUser = userStr.user.data.attributes;
             this.currentUser["id"] =  userStr.user.data.id;
             localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
         return data;
      }))

}


  login(userInfo: any) {
      const url = environment.apiUrl + "/users/login";
      const body = {user: {data: {attributes: userInfo }}}
      return this.http.post(url, body, { headers: this.GetHttpHeaders() }).pipe(map(data => {
        if (data ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
             const userStr = JSON.parse(JSON.stringify(data));
             this.currentUser = userStr.user.data.attributes;
             this.currentUser["id"] =  userStr.user.data.id;
             localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
         return data;
      }))

}

  addFriend(friend: any) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const url = environment.apiUrl + "/users/add_friend";
      const body = { friend_email: friend, id: this.currentUser["id"]}
      return this.http.post(url, body, { headers: this.GetHttpHeaders() }).pipe(map(data => {
        if (data ) {
            const userStr = JSON.parse(JSON.stringify(data));
            this.currentUser = userStr.user.data.attributes;
            this.currentUser["id"] =  userStr.user.data.id;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
         return data;
      }))

  }

  removeFriend(friend_email) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const url = environment.apiUrl + "/users/remove_friend";
      const body = { friend_email: friend_email, id: this.currentUser["id"]}
      return this.http.post(url, body, { headers: this.GetHttpHeaders() }).pipe(map(data => {
        if (data ) {
            const userStr = JSON.parse(JSON.stringify(data));
            this.currentUser = userStr.user.data.attributes;
            this.currentUser["id"] =  userStr.user.data.id;
            console.log(this.currentUser);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
         return data;
      }))

  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.login_timeOut = "";
    this.router.navigate(["/"]);
 }


}
