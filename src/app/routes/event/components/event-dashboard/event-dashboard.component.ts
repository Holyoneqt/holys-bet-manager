import { Component, Input, OnInit } from '@angular/core';
import { Bet, Event } from 'src/app/models/ufc.models';

interface PlayerSummary {
  name: string;
  totalBets: number;
  totalWon: number;
  overall: number;
}

@Component({
  selector: 'app-event-dashboard',
  templateUrl: 'event-dashboard.component.html',
  styleUrls: ['event-dashboard.component.scss'],
})
export class EventDashboardComponent implements OnInit {
  @Input() public event: Event;

  public trackByIndex = (index: number) => index;

  ngOnInit() {}

  public getPlayerSummary(player: string): PlayerSummary {
    const allBets: Bet[] = this.event.bets ?? [];

    let totalBets = 0;
    let totalWin = 0;
    allBets.forEach((bet) => {
      let betOn = 0;
      if ((bet.fighters.first.players ?? []).includes(player)) {
        totalBets += bet.betAmount ?? 0;
        betOn = bet.fighters.first.id;
      }

      if ((bet.fighters.second.players ?? []).includes(player)) {
        totalBets += bet.betAmount ?? 0;
        betOn = bet.fighters.second.id;
      }

      const winnings = this.calculateWinningsOfFight(bet, bet.winnerId === betOn);
      totalWin += winnings;
    });

    return {
      name: player,
      totalBets: this.round(totalBets),
      totalWon: this.round(totalWin),
      overall: this.round(totalWin - totalBets),
    };
  }

  private calculateWinningsOfFight(bet: Bet, hasWon: boolean): number {
    if (!hasWon) return 0;
    let losingPlayers = [],
      winningPlayers = [];
    if (bet.winnerId === bet.fighters.first.id) {
      losingPlayers = bet.fighters.second.players;
      winningPlayers = bet.fighters.first.players;
    }
    if (bet.winnerId === bet.fighters.second.id) {
      losingPlayers = bet.fighters.first.players;
      winningPlayers = bet.fighters.second.players;
    }

    return (
      bet.betAmount + (losingPlayers?.length * bet.betAmount) / winningPlayers.length
    );
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
