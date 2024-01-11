import { NgModule } from '@angular/core'
import { ComponentModule } from './component/component.module';
import { ServiceModule } from './service/service.module';
import { InterceptorModule } from './interceptors/interceptor.module';
import { PageModule } from './page/page.module';

@NgModule({
    declarations: [],
    imports: [
        ComponentModule,
        ServiceModule,
        InterceptorModule,
        PageModule
    ],
    exports: [
        ComponentModule,
        ServiceModule,
        InterceptorModule,
        PageModule
    ]

})
export class SharedModule { }