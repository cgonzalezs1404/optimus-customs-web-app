import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PAGES_ROUTES } from "./page.routing";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { FacturaComponent } from "./factura/factura.component";
import { OperacionComponent } from "./operacion/operacion.component";
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServiceModule } from "../service/service.module";

@NgModule({

    declarations: [
        HomeComponent,
        FacturaComponent,
        OperacionComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        RouterModule,
        SharedModule,
        ServiceModule,
        ModalModule.forRoot(),
        PAGES_ROUTES
    ]
})
export class PageModule { }