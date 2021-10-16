import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ContextMenuItem } from 'src/app/models/context-menu.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-card',
  },
})
export class CardComponent implements OnInit {

  @HostBinding('class.content-center')
  @Input('content-center') contentCentered: boolean = false;

  @Input() contextMenu: ContextMenuItem[];
  @Output() contextMenuClick = new EventEmitter<string>();

  ngOnInit(): void {}
}
