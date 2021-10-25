import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fight } from 'src/app/models/ufc.models';

export interface PlaceBetsDialogData {
  fight: Fight;
  players: string[];
}

@Component({
  selector: 'app-set-winner',
  templateUrl: './set-winner.component.html',
  styleUrls: ['./set-winner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-set-winner',
  },
})
export class SetWinnerDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SetWinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fight
  ) {}

  ngOnInit(): void {}

  public submit(fighterId: number): void {
    this.dialogRef.close(fighterId);
  }
}
