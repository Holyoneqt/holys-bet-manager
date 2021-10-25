import { HttpClientModule } from '@angular/common/http';
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
import { EventDashboardComponent } from './routes/event/components/event-dashboard/event-dashboard.component';
import { EventComponent } from './routes/event/event.component';
import { HomeComponent } from './routes/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventComponent,
    EventDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppDialogsModule,
    UiModule,
    HttpClientModule,

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
