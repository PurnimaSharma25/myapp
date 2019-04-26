import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../../_models/user.model";
import { AuthService } from "../../_services/auth.service";
import { AlertService } from "../../_services/alert.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private alertService: AlertService) { }

  ngOnInit() {

  }

  login(userInfo: any){
    this.authService.login(userInfo)
        .subscribe(
            user => {
              localStorage.setItem('flash', "Sign in Successfully");
              this.router.navigate(["/dashboard"]);
            },
            error => {
               this.alertService.error(error.error.message);
            });
  }

}
