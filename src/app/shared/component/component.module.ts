import { NgModule } from '@angular/core'
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { LoadingComponent } from './loading/loading.component'
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ContentWrapperComponent,
        ControlSidebarComponent,
        LoadingComponent,
        MainFooterComponent,
        MainHeaderComponent,
        MainSidebarComponent
    ],
    imports:[
        CommonModule,
        RouterModule
    ],
    exports:[
        ContentWrapperComponent,
        ControlSidebarComponent,
        LoadingComponent,
        MainFooterComponent,
        MainHeaderComponent,
        MainSidebarComponent
    ]
})

export class ComponentModule { }