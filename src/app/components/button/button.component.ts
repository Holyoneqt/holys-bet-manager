import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[appButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-button',
  },
})
export class ButtonComponent implements OnInit {
  ngOnInit(): void {}
}
