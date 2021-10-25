import { Component, Inject, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/models/ufc.models';

import { InputComponent } from '../../components/input/input.component';

interface PlayerObject {
  index: number;
  name: string;
}

@Component({
  selector: 'app-add-players-dialog',
  templateUrl: './add-players-dialog.component.html',
  styleUrls: ['./add-players-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-add-players-dialog',
  },
})
export class AddPlayersDialogComponent implements OnInit {
  @ViewChildren(InputComponent)
  public inputValues: QueryList<HTMLInputElement>;

  public players: PlayerObject[];

  constructor(
    public dialogRef: MatDialogRef<AddPlayersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event
  ) {}

  ngOnInit(): void {
    if (this.event.players === undefined || this.event.players.length === 0) {
      this.players = [...Array(6).keys()].map((v, i) => ({
        index: i+ 1,
        name: '',
      }));
    } else {
      this.players = this.event.players.map((p, i) => ({ index: i + 1, name: p }));
    }
  }

  public addPlayer(): void {
    this.players.push({ index: this.players.length + 1, name: '' });
  }

  public submit(): void {
    this.dialogRef.close(
      this.inputValues
        .map((input) => input.value)
        .filter((value) => value !== '')
    );
  }
}
