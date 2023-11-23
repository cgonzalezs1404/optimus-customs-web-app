import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from '../core/component/forgot-password/forgot-password.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperacionComponent } from './operacion/operacion.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'operacion', component: OperacionComponent },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }