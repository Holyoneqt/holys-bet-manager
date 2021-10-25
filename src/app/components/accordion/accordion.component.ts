import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collapseAnimation, CollapseAnimationState } from 'src/app/animations/collapse';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [collapseAnimation],
  host: {
    class: 'app-accordion',
  },
})
export class AccordionComponent implements OnInit {
  public isOpen$: BehaviorSubject<boolean>;
  public accordionState$: Observable<CollapseAnimationState>;

  ngOnInit(): void {
    this.isOpen$ = new BehaviorSubject(false as boolean);
    this.accordionState$ = this.isOpen$.pipe(
      map(isOpen => isOpen ? 'open' : 'closed'),
    );
  }

  public toggle(): void {
    this.isOpen$.next(!this.isOpen$.value);
  }
}
