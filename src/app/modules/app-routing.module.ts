import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent } from '../routes/event/event.component';
import { HomeComponent } from '../routes/home/home.component';

export const AppRoute = {
    Home: 'home',
    Event: 'event',
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
        data: {
          transtitionState: AppRoute.Home
        }
    },
    {
        path: `${AppRoute.Event}/:id`,
        component: EventComponent,
        data: {
          transtitionState: AppRoute.Event
        }
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
