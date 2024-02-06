import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { SharedModule } from "./shared/shared.module";
import { APP_ROUTES } from './app.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent
  ],
  providers: [
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
