import { LoginComponent } from '../core/component/login/login.component';
import { HomeComponent } from '../core/component/home/home.component';
import { ForgotPasswordComponent } from '../core/component/forgot-password/forgot-password.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path:'home', component:HomeComponent},
    { path: 'forgot_password', component: ForgotPasswordComponent },
    { path: '', redirectTo:'/home', pathMatch:'full' },
    { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }