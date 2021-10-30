import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fighter } from 'src/app/models/ufc.models';

export interface FighterStatsDialogData {
  fighters: Fighter[];
}

@Component({
  selector: 'app-fighter-stats',
  templateUrl: './fighter-stats.component.html',
  styleUrls: ['./fighter-stats.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-fighter-stats',
  },
})
export class FighterStatsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FighterStatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FighterStatsDialogData
  ) {}

  ngOnInit(): void {}

  public close(): void {
    this.dialogRef.close();
  }
}
