import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bet, Fight } from 'src/app/models/ufc.models';

export interface PlaceBetsDialogData {
  fight: Fight;
  players: string[];
}

@Component({
  selector: 'app-place-bets',
  templateUrl: './add-fight.component.html',
  styleUrls: ['./add-fight.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-place-bets',
  },
})
export class PlaceBetsDialogComponent implements OnInit {
  public playerData: {
    player: string;
    selection: number;
  }[];

  constructor(
    public dialogRef: MatDialogRef<PlaceBetsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlaceBetsDialogData
  ) {}

  ngOnInit(): void {
    this.playerData = this.data.players.map((p) => ({
      player: p,
      selection: -1,
    }));
  }

  public submit(betAmount: string): void {
    const firstFighter = {
      id: this.data.fight.Fighters[0].FighterId,
      name: this.data.fight.Fighters[0].LastName,
      players: this.playerData
        .filter((p) => p.selection === 0)
        .map((p) => p.player),
    };

    const secondFighter = {
      id: this.data.fight.Fighters[1].FighterId,
      name: this.data.fight.Fighters[1].LastName,
      players: this.playerData
        .filter((p) => p.selection === 1)
        .map((p) => p.player),
    };

    const bet: Bet = {
      fightId: this.data.fight.FightId,
      fighters: {
        first: firstFighter,
        second: secondFighter,
      },
      betAmount: parseFloat(betAmount),
    };

    this.dialogRef.close(bet);
  }
}
