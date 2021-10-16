import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { objectVal, update } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseReference } from '@firebase/database';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { AddFightDialogComponent } from 'src/app/dialogs/add-fight/add-fight.component';
import { AddPlayersDialogComponent } from 'src/app/dialogs/add-players/add-players-dialog.component';
import { ContextMenu } from 'src/app/models/context-menu.model';
import { Fight } from 'src/app/models/fight.model';
import { Night } from 'src/app/models/night.model';
import { AppDbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.scss'],
  animations: [
    trigger('collapse', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'void',
        style({
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition('* => *', animate('.3s ease')),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NightComponent implements OnInit {
  public isLoading$: Observable<boolean>;

  private nightId: string;
  public nightRef: DatabaseReference;
  public night$: Observable<Night>;
  public allFights$: Observable<Fight[]>;

  public readonly contextMenuEdit = ContextMenu.Edit;

  constructor(
    private db: AppDbService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.night$ = this.route.paramMap.pipe(
      tap((paramMap) => {
        this.nightId = paramMap.get('id') as string;
        this.nightRef = this.db.getNightRef(this.nightId);
        this.allFights$ = this.db.getAllFightsOfNight(this.nightId);
      }),
      switchMap(() => objectVal<Night>(this.nightRef))
    );

    this.isLoading$ = this.night$.pipe(
      startWith(undefined),
      map((night) => night === undefined)
    );
  }

  public setWinner(fightId: string, name: string): void {
    const dbRef = this.db.getRef(`nights/${this.nightId}/fights/${fightId}`);
    update(dbRef, {
      winner: name,
    });
  }

  public addPlayers(): void {
    this.dialog
      .open(AddPlayersDialogComponent, {
        data: this.night$,
      })
      .afterClosed()
      .subscribe((players) => {
        if (players && players.length > 0) {
          update(this.nightRef, {
            players: players,
          });
        }
      });
  }

  public addFight(): void {
    this.dialog
      .open(AddFightDialogComponent, {
        data: this.night$.pipe(map((n) => n.players)),
      })
      .afterClosed()
      .subscribe((fighters) => {
        this.db.createNewFight(this.nightId, fighters[0], fighters[1], fighters[2]);
      });
  }
}
