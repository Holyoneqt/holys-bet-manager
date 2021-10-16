import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [
    CardComponent,
    ButtonComponent,
    FormFieldComponent,
    InputComponent,
    ContextMenuComponent,
    ContextMenuDirective,
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    FormFieldComponent,
    InputComponent,
    ContextMenuComponent,
    ContextMenuDirective,

    MatIconModule,
    MatDialogModule,
  ],
})
export class UiModule {}
