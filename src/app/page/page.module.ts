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
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { FlatpickrModule } from "angularx-flatpickr";
import { FacturaFormComponent } from "./factura/factura-form/factura-form.component";

@NgModule({

    declarations: [
        HomeComponent,
        FacturaComponent,
        OperacionComponent,
        FacturaFormComponent
        
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        RouterModule,
        SharedModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        FlatpickrModule.forRoot(),
        PAGES_ROUTES
    ]
})
export class PageModule { }