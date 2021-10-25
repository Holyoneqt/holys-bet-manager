import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/models/ufc.models';
import { UfcService } from 'src/app/services/ufc.service';

@Component({
  selector: 'app-add-night-dialog',
  templateUrl: './add-night-dialog.component.html',
  styleUrls: ['./add-night-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-add-night-dialog',
  },
})
export class AddNightDialogComponent implements OnInit {

  public schedule$: Observable<Event[]>

  constructor(
    public dialogRef: MatDialogRef<AddNightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ufc: UfcService,
  ) {}

  ngOnInit(): void {
    this.schedule$ = this.ufc.getSchedule().pipe(
      map(events => events.filter(e => e.Status !== 'Final')),
    );
  }


  public submit(eventId: number): void {
    this.dialogRef.close(eventId);
  }
}
