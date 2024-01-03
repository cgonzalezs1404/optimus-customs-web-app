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
        service.SessionService
    ],
    exports: []
}) export class ServiceModule { }