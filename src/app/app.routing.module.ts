import { LoginComponent } from './pages/home/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }