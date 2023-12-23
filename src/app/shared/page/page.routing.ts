import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot_password', component: ForgotPasswordComponent, }
];

export const CORE_PAGE_ROUTES = RouterModule.forChild(appRoutes);
