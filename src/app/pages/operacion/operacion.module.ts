import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperacionRoutingModule } from './operacion.routing.module';
import { OperacionComponent } from './operacion.component';
import { OperacionFormComponent } from './operacion-form/operacion-form.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    OperacionComponent,
    OperacionFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OperacionRoutingModule
  ]
})
export class OperacionModule { }
