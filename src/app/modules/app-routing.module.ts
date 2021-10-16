import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../routes/home/home.component';
import { NightComponent } from '../routes/night/night.component';

export const AppRoute = {
    Home: 'home',
    Night: 'night',
    Fights: 'fights',
}

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoute.Home,
    },
    {
        path: AppRoute.Home,
        component: HomeComponent,
    },
    {
        path: `${AppRoute.Night}/:id`,
        component: NightComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
