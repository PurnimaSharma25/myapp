import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor } from './_helpers/jwt.intercepter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { HttpClientModule ,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {  AuthService } from './_services/auth.service';
import {  AlertService } from './_services/alert.service';
import { AlertComponent } from './_directives/index';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    UsersComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  },AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



