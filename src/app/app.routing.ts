
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionResolver } from './resolver/session.resolver';
import { PageComponent } from './page/page.component';
import { PageModule } from './page/page.module';


export const routes: Routes = [
  { path: '', component: PageComponent, loadChildren: () => PageModule, resolve: {httpResponse: SessionResolver} },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules } );