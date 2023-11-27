import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperacionComponent } from './operacion.component';
import { OperacionFormComponent } from './operacion-form/operacion-form.component';

const routes: Routes = [
  { path: 'operacion', component: OperacionComponent },
  { path: 'operacion_form', component: OperacionFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionRoutingModule { }
