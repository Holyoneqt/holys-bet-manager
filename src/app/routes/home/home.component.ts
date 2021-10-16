import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Night } from 'src/app/models/night.model';
import { AppRoute } from 'src/app/modules/app-routing.module';
import { AppDbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public allNights$: Observable<Night[]>;

  constructor(private db: AppDbService, private router: Router) {}

  ngOnInit(): void {
    this.allNights$ = this.db.getAllNights();
  }

  public addNewNight(): void {
    this.db.createNewNight().subscribe((n) => this.navigateToNight(n.id));
  }

  public navigateToNight(id: string): void {
    this.router.navigate([AppRoute.Night, id]);
  }
}
