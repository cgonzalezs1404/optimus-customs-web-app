import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { OperacionModule } from './pages/operacion/operacion.module';
import { FacturaModule } from './pages/factura/factura.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HomeModule,
    OperacionModule,
    FacturaModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
