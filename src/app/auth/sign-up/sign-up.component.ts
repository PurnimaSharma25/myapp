import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from "../../_models/user.model";
import { AuthService } from "../../_services/auth.service";
import { AlertService } from "../../_services/alert.service";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  errors: any[];
  fname_error: '';
  lname_error: '';
  email_error: '';
  password_error: '';

  constructor( private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private alertService: AlertService) { 
  }

  ngOnInit() {
    this.authService.logout();
  }

  submitUser(userInfo: any){
  console.log(userInfo);
     this.user = new User(userInfo);
     this.errors = this.user.validate();
     console.log(this.errors);
     this.reset_error_fields();
     if(this.errors.length > 0 ){
        for (let error of this.errors) {
           this[error['field'] + "_error"] = error['message'];
        }
     }
     else{
        this.signUp();
     }
  }


    signUp(){
      this.authService.signUp(this.user)
          .subscribe(
              user => {
                localStorage.setItem('flash', "Sign in Successfully");
                this.router.navigate(["/dashboard"]);
              },
              error => {
                 this.alertService.error(error.error.message);
              });
  }

  reset_error_fields(){
      this.fname_error = '';
      this.lname_error = '';
      this.email_error = '';
      this.password_error = '';
  }

}
