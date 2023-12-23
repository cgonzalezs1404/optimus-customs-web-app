import { RouterModule, Routes } from '@angular/router';
import { OperacionComponent } from './operacion/operacion.component';
import { OperacionFormComponent } from './operacion/operacion-form/operacion-form.component';
import { FacturaComponent } from './factura/factura.component';
import { HomeComponent } from './home/home.component';

const pagesRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'operacion', component: OperacionComponent },
    { path: 'operacion_form', component: OperacionFormComponent },
    { path: 'factura', component: FacturaComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);