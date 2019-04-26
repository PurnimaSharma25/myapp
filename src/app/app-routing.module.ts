import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full'},
  { path: 'dashboard', component: UsersComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
