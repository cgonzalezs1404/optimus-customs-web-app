import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura.routing.module';
import { FacturaComponent } from './factura.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    FacturaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
