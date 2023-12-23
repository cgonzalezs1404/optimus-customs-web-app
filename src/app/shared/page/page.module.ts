import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { CommonModule } from "@angular/common";
import { ComponentModule } from "../component/component.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CORE_PAGE_ROUTES } from "./page.routing";

@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent
    ],
    imports: [
        CORE_PAGE_ROUTES,
        CommonModule,
        ComponentModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class PageModule { }