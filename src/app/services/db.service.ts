import { Injectable } from '@angular/core';
import { Database, DatabaseReference, objectVal, ref, set } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { first, map, mapTo } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { Fight, Fighter } from '../models/fight.model';
import { Event } from '../models/ufc.models';

@Injectable({ providedIn: 'root' })
export class AppDbService {
  private events: DatabaseReference;

  constructor(private db: Database) {
    this.events = ref(this.db, 'events');
  }

  public getRef(path: string): DatabaseReference {
    return ref(this.db, path);
  }

  public getAllEvents(): Observable<Event[]> {
    return objectVal<any>(this.events).pipe(map(this.mapToArray));
  }

  public getAllFightsOfNight(id: string): Observable<Fight[]> {
    return objectVal(ref(this.db, `nights/${id}/fights`)).pipe(
      map(this.mapToArray)
    );
  }

  public getEventRef(eventId: number | string): DatabaseReference {
    return ref(this.db, `events/${eventId}`);
  }

  public getFightRef(nightId: string, id: string): DatabaseReference {
    return ref(this.db, `nights/${nightId}/fights/${id}`);
  }

  public createNewEvent(event: Event): Observable<void> {
    const newDoc = ref(this.db, `events/${event.EventId}`);

    return from(set(newDoc, {
      ...event,
      players: [],
    } as Event));
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
