import { Component, Input, OnInit } from '@angular/core';
import { Fight } from 'src/app/models/fight.model';
import { Night } from 'src/app/models/night.model';

interface PlayerSummary {
  name: string;
  totalBets: number;
  totalWon: number;
  overall: number;
}

@Component({
  selector: 'app-night-dashboard',
  templateUrl: 'night-dashboard.component.html',
  styleUrls: ['night-dashboard.component.scss'],
})
export class NightDashboardComponent implements OnInit {
  @Input() public night: Night | null;

  public trackByIndex = (index: number) => index;

  ngOnInit() {}

  public getPlayerSummary(player: string): PlayerSummary {
    const fights: Fight[] = this.mapToArray(this.night?.fights);

    let totalBets = 0;
    let totalWin = 0;
    fights.forEach(f => {
      let betOn = '';
      if (f.firstFighter.players.includes(player)) {
        totalBets += f.bet ?? 0;
        betOn = f.firstFighter.name;
      }
      
      if (f.secondFighter.players.includes(player)) {
        totalBets += f.bet ?? 0;
        betOn = f.secondFighter.name;
      }

      const winnings = this.calculateWinningsOfFight(f, f.winner === betOn);
      totalWin += winnings;
    });

    return {
      name: player,
      totalBets: this.round(totalBets),
      totalWon: this.round(totalWin),
      overall: this.round(totalWin - totalBets),
    }
  }

  private calculateWinningsOfFight(fight: Fight, hasWon: boolean): number {
    if (!hasWon) return 0;
    let losingPlayers = [], winningPlayers = [];
    if (fight.winner === fight.firstFighter.name) {
      losingPlayers = fight.secondFighter.players;
      winningPlayers = fight.firstFighter.players;
    }
    if (fight.winner === fight.secondFighter.name) {
      losingPlayers = fight.firstFighter.players;
      winningPlayers = fight.secondFighter.players;
    } 

    return fight.bet + ((losingPlayers?.length * fight.bet) / winningPlayers.length);
  }
  
  private mapToArray(value: any): any[] {
    if (value === null) return [];
    return Object.keys(value).map((key) => value[key]);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
