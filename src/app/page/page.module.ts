import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PAGES_ROUTES } from "./page.routing";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { FacturaComponent } from "./factura/factura.component";
import { OperacionComponent } from "./operacion/operacion.component";

@NgModule({

    declarations: [
        HomeComponent,
        FacturaComponent,
        OperacionComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        SharedModule,
        PAGES_ROUTES
    ]
})
export class PageModule { }