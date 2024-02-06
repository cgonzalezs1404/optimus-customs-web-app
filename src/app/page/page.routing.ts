import { RouterModule, Routes } from '@angular/router';
import { OperacionComponent } from './operacion/operacion.component';
import { FacturaComponent } from './factura/factura.component';
import { HomeComponent } from './home/home.component';
import { FacturaFormComponent } from './factura/factura-form/factura-form.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

const pagesRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'operacion', component: OperacionComponent },
    { path: 'factura', component: FacturaComponent },
    { path: 'factura/:id', component: FacturaFormComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);