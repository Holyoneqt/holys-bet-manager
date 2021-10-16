import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { UiModule } from './components/ui.module';
import { AppDialogsModule } from './dialogs/dialogs.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { HomeComponent } from './routes/home/home.component';
import { NightDashboardComponent } from './routes/night/components/night-dashboard/night-dashboard.component';
import { NightComponent } from './routes/night/night.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NightComponent, NightDashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppDialogsModule,
    UiModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => {
      const database = getDatabase();
      return database;
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
