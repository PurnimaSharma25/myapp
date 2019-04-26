import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { AlertService } from "../_services/alert.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  flash = ""
  friend = ""
  currentUser = {}

  constructor(
      private authService: AuthService,
      private alertService: AlertService) { }

  ngOnInit() {
      this.flash = localStorage.getItem('flash');;
	    if (this.flash)
	    {
	      this.alertService.success(this.flash);
	    }
	    localStorage.removeItem('flash');
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  addFriend(){
      this.authService.addFriend(this.friend)
    .subscribe(
        user => {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.alertService.success("Friend added successfully");
        },
        error => {
           this.alertService.error(error.error.message);
        });
  }

  removeFriend(friend_email){
      this.authService.removeFriend(friend_email)
    .subscribe(
        user => {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.alertService.success("Friend removed successfully");
        },
        error => {
           this.alertService.error(error.error.message);
        });
  }

   onLogout(){
     this.authService.logout();
   }

}
