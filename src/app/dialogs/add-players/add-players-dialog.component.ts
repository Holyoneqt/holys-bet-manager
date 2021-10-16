import { Component, Inject, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Night } from 'src/app/models/night.model';

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
    @Inject(MAT_DIALOG_DATA) public data: Observable<Night>
  ) {}

  ngOnInit(): void {
    this.data.pipe(first()).subscribe((night) => {
      if (night.players === undefined || night.players.length === 0) {
        this.players = [...Array(6).keys()].map((v, i) => ({
          index: i+ 1,
          name: '',
        }));
      }
      this.players = night.players.map((p, i) => ({ index: i + 1, name: p }));
    });
  }

  public addPlayer(): void {
    this.players.push({ index: this.players.length + 1, name: '' });
  }

  public submit(): void {
    console.log(this.inputValues);
    this.dialogRef.close(
      this.inputValues
        .map((input) => input.value)
        .filter((value) => value !== '')
    );
  }
}
