import { Component, OnInit } from '@angular/core';
import { DatabaseReference, objectVal, update } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { collapseAnimation } from 'src/app/animations/collapse';
import { fadeInAnimation } from 'src/app/animations/fade';
import { PlaceBetsDialogComponent, PlaceBetsDialogData } from 'src/app/dialogs/add-fight/add-fight.component';
import { AddPlayersDialogComponent } from 'src/app/dialogs/add-players/add-players-dialog.component';
import { FighterStatsDialogComponent } from 'src/app/dialogs/fighter-stats/fighter-stats.component';
import { SetWinnerDialogComponent } from 'src/app/dialogs/set-winner/set-winner.component';
import { ContextMenu, ContextMenuItem } from 'src/app/models/context-menu.model';
import { Bet, Event, Fight } from 'src/app/models/ufc.models';
import { AppDbService } from 'src/app/services/db.service';

interface GroupedFights {
  name: string;
  fights: Fight[];
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  animations: [collapseAnimation, fadeInAnimation],
})
export class EventComponent implements OnInit {
  public eventRef: DatabaseReference;
  public event$: Observable<Event>;

  public readonly contextMenuEdit = ContextMenu.Edit;
  public readonly contextMenuFight: ContextMenuItem[] = [
    { type: 'item', icon: 'info', key: 'info', display: 'Fighter Stats' },
    { type: 'item', icon: 'paid', key: 'bet', display: 'Bet' },
    { type: 'seperator' },
    {
      type: 'item',
      icon: 'emoji_events',
      key: 'set-winner',
      display: 'Set Winner',
    },
  ];

  constructor(
    private db: AppDbService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(
      tap(
        (params) =>
          (this.eventRef = this.db.getEventRef(params.get('id') ?? ''))
      ),
      switchMap((params) => objectVal<Event>(this.eventRef))
    );

    this.event$.subscribe(console.log);
  }

  public handleFightContextMenuClick(
    key: string,
    event: Event,
    fight: Fight
  ): void {
    if (key === 'bet') return this.placeBets(event, fight);
    if (key === 'set-winner') return this.setWinner(event, fight);
    if (key === 'info') return this.openFighterStats(fight);
  }

  public openFighterStats(fight: Fight): void {
    this.dialog.open(FighterStatsDialogComponent, {
      data: {
        fighters: fight.Fighters
      }
    });
  }

  public setWinner(event: Event, fight: Fight): void {
    this.dialog
      .open(SetWinnerDialogComponent, {
        data: fight,
      })
      .afterClosed()
      .subscribe((fighterId) => {
        const betIndex =
          event.bets?.findIndex((bet) => bet.fightId === fight.FightId) ?? -1;
        if (betIndex !== -1) {
          const bet: Bet = (event.bets ?? [])[betIndex];
          (event.bets ?? [])[betIndex] = {
            ...bet,
            winnerId: fighterId,
          };

          update(this.eventRef, {
            bets: event.bets,
          });
        }
      });
  }

  public placeBets(event: Event, fight: Fight): void {
    this.dialog
      .open(PlaceBetsDialogComponent, {
        data: {
          fight: fight,
          players: event.players,
        } as PlaceBetsDialogData,
      })
      .afterClosed()
      .subscribe((bet: Bet) => {
        if (bet) {
          const betIndex = (event.bets ?? []).findIndex(e => e.fightId === bet.fightId);
          if (betIndex === -1) {
            update(this.eventRef, {
              bets: [...(event.bets ?? []), bet],
            });
          } else {
            (event.bets ?? [])[betIndex] = bet;
            update(this.eventRef, {
              bets: event.bets,
            });
          }
        }
      });
  }

  public addPlayers(event: Event): void {
    this.dialog
      .open(AddPlayersDialogComponent, {
        data: event,
      })
      .afterClosed()
      .subscribe((players) => {
        if (players && players.length > 0) {
          update(this.eventRef, {
            players: players,
          });
        }
      });
  }

  public getFightsGroupedByCard(event: Event): GroupedFights[] {
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    const cards = event.Fights?.map((f) => f.CardSegment).filter(
      (v, i, a) => a.indexOf(v) === i
    );

    const fights: GroupedFights[] = [];
    cards?.forEach((card) => {
      fights.push({
        name: card,
        fights: (event.Fights ?? []).filter((f) => f.CardSegment === card && f.Status !== 'Canceled'),
      });
    });

    return fights;
  }

  public getWinnerOfFight(event: Event, fight: Fight): number {
    return event.bets?.find(bet => bet.fightId === fight.FightId)?.winnerId ?? 0;
  }

  public getBetOfFight(fightId: number, event: Event): Bet | undefined {
    return (event.bets ?? []).find((bet) => bet.fightId === fightId);
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
