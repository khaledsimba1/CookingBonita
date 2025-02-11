import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { DetailsUsersComponent } from './details-users/details-users.component';
import { DetailsRecettesComponent } from './details-recettes/details-recettes.component';
import { VerifAuthGuard } from './services/verifAuth.guard';

const routeConfig: Routes = [

    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
      canActivate: [VerifAuthGuard]
    },
    {
      path: 'home',
      component: HomeComponent,
      title: 'Home page',
      canActivate: [VerifAuthGuard]
    },
    {
      path: 'users/details/:id',
      component: DetailsUsersComponent,
      title: 'Page Details Utilisateurs',
      canActivate: [VerifAuthGuard]
    },
    {
      path: 'recettes/details/:id',
      component: DetailsRecettesComponent,
      title: 'Page Details Utilisateurs',
      canActivate: [VerifAuthGuard]
    },
    
  ];
  export default routeConfig;