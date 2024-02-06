import { NgModule } from '@angular/core'
import *  as service from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        service.LoadingService,
        service.UsuarioTokenService,
        service.SessionService,

        service.ConsumidorService,
        service.EstadoService,
        service.GiroService,
        service.OperacionService,
        service.FacturaService,
        service.FacturaArchivoService,
        service.UsuarioService,
        service.PrivilegioService,

        service.FileService
    ],
    exports: []
}) export class ServiceModule { }