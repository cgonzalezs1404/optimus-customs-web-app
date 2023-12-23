import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { SharedModule } from "./shared/shared.module";
import { APP_ROUTES } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent
  ],
  providers: [
    provideClientHydration()
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,

    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
