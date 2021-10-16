import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-fight',
  templateUrl: './add-fight.component.html',
  styleUrls: ['./add-fight.component.scss'],
})
export class AddFightDialogComponent implements OnInit {
  public playerData: {
    player: string;
    selection: number;
  }[];

  constructor(
    public dialogRef: MatDialogRef<AddFightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public players$: Observable<string[]>
  ) {}

  ngOnInit(): void {
    this.players$.pipe(first()).subscribe((players) => {
      this.playerData = players.map((p) => ({
        player: p,
        selection: -1,
      }));
    });
  }

  public submit(fighterOne: string, fighterTwo: string, bet: string): void {
    const firstFighter = {
      name: fighterOne,
      players: this.playerData.filter(p => p.selection === 0).map(p => p.player),
    }
    
    const secondFighter = {
      name: fighterTwo,
      players: this.playerData.filter(p => p.selection === 1).map(p => p.player),
    }
    
    this.dialogRef.close([ firstFighter, secondFighter, parseFloat(bet) ]);
  }
}
