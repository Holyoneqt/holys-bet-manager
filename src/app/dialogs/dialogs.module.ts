import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from '../components/ui.module';
import { AddFightDialogComponent } from './add-fight/add-fight.component';
import { AddPlayersDialogComponent } from './add-players/add-players-dialog.component';

@NgModule({
  imports: [CommonModule, UiModule],
  exports: [AddPlayersDialogComponent, AddFightDialogComponent],
  declarations: [AddPlayersDialogComponent, AddFightDialogComponent],
})
export class AppDialogsModule {}
