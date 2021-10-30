import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from '../components/ui.module';
import { PlaceBetsDialogComponent } from './add-fight/add-fight.component';
import { AddNightDialogComponent } from './add-night/add-night-dialog.component';
import { AddPlayersDialogComponent } from './add-players/add-players-dialog.component';
import { FighterStatsDialogComponent } from './fighter-stats/fighter-stats.component';
import { SetWinnerDialogComponent } from './set-winner/set-winner.component';

@NgModule({
  imports: [CommonModule, UiModule],
  exports: [
    AddPlayersDialogComponent,
    PlaceBetsDialogComponent,
    AddNightDialogComponent,
    SetWinnerDialogComponent,
    FighterStatsDialogComponent,
  ],
  declarations: [
    AddPlayersDialogComponent,
    PlaceBetsDialogComponent,
    AddNightDialogComponent,
    SetWinnerDialogComponent,
    FighterStatsDialogComponent,
  ],
})
export class AppDialogsModule {}
