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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FacturaActivaComponent } from './factura/factura-activa/factura-activa.component';
import { FacturaPendienteComponent } from './factura/factura-pendiente/factura-pendiente.component';
import { FacturaHistorialComponent } from './factura/factura-historial/factura-historial.component';
import { OperacionActivaComponent } from "./operacion/operacion-activa/operacion-activa.component";
import { OperacionHistorialComponent } from "./operacion/operacion-historial/operacion-historial.component";

@NgModule({

    declarations: [
        HomeComponent,
        FacturaComponent,
        FacturaFormComponent,
        FacturaActivaComponent,
        FacturaPendienteComponent,
        FacturaHistorialComponent,
        OperacionComponent,
        OperacionActivaComponent,
        OperacionHistorialComponent
        
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
        TabsModule.forRoot(),
        PAGES_ROUTES
    ]
})
export class PageModule { }