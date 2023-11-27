import { NgModule } from '@angular/core'
import { ComponentModule } from './component/component.module';
import { ServiceModule } from './service/service.module';

@NgModule({
    declarations: [

    ],
    imports: [
        ComponentModule,
        ServiceModule
    ],
    exports: [
        ComponentModule,
        ServiceModule,
    ]

})
export class SharedModule { }