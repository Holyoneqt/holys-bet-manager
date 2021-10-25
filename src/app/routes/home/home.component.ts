import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AddNightDialogComponent } from 'src/app/dialogs/add-night/add-night-dialog.component';
import { Event } from 'src/app/models/ufc.models';
import { AppRoute } from 'src/app/modules/app-routing.module';
import { AppDbService } from 'src/app/services/db.service';
import { UfcService } from 'src/app/services/ufc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public allEvents$: Observable<Event[]>;

  constructor(private db: AppDbService, private router: Router, private ufc: UfcService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.allEvents$ = this.db.getAllEvents();
  }

  public addNewEvent(): void {
    this.dialog.open(AddNightDialogComponent).afterClosed().pipe(
      filter(eventId => eventId !== undefined),
      switchMap(eventId => this.ufc.getEvent(eventId)),
      switchMap(event => this.db.createNewEvent(event))
    ).subscribe();
  }

  public navigateToEvent(id: string | number): void {
    this.router.navigate([AppRoute.Event, id]);
  }
}
