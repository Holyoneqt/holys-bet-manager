import { Injectable } from '@angular/core';
import { Database, DatabaseReference, objectVal, ref, set } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { first, map, mapTo } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { Fight, Fighter } from '../models/fight.model';
import { Night } from '../models/night.model';

@Injectable({ providedIn: 'root' })
export class AppDbService {
  private nights: DatabaseReference;

  constructor(private db: Database) {
    this.nights = ref(this.db, 'nights');
  }

  public getRef(path: string): DatabaseReference {
    return ref(this.db, path);
  }

  public getAllNights(): Observable<Night[]> {
    return objectVal<any>(this.nights).pipe(map(this.mapToArray));
  }

  public getAllFightsOfNight(id: string): Observable<Fight[]> {
    return objectVal(ref(this.db, `nights/${id}/fights`)).pipe(
      map(this.mapToArray)
    );
  }

  public getNightRef(id: string): DatabaseReference {
    return ref(this.db, `nights/${id}`);
  }

  public getFightRef(nightId: string, id: string): DatabaseReference {
    return ref(this.db, `nights/${nightId}/fights/${id}`);
  }

  public createNewNight(): Observable<Night> {
    const newId = uuidv4();
    const newDoc = ref(this.db, `nights/${newId}`);
    const newNight: Night = {
      id: newId,
      name: 'Created night',
      timestamp: new Date().getTime(),
      players: [],
      fights: [],
    };

    return from(set(newDoc, newNight)).pipe(first(), mapTo(newNight));
  }

  public createNewFight(
    nightId: string,
    fighterOne: Fighter,
    fighterTwo: Fighter,
    bet: number,
  ): Observable<Fight> {
    const newId = uuidv4();
    const newDoc = ref(this.db, `nights/${nightId}/fights/${newId}`);
    const newFight: Fight = {
      id: newId,
      firstFighter: fighterOne,
      secondFighter: fighterTwo,
      bet: bet,
    };

    return from(set(newDoc, newFight)).pipe(first(), mapTo(newFight));
  }

  private mapToArray(value: any): any[] {
    if (value === null) return [];
    return Object.keys(value).map((key) => value[key]);
  }
}
