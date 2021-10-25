import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Event } from '../models/ufc.models';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class UfcService {
  constructor(private http: HttpClient, private cache: CacheService) {}

  public getSchedule(): Observable<Event[]> {
    return this.get(`Schedule/UFC/${new Date().getFullYear()}`);
  }

  public getEvent(eventId: number): Observable<Event> {
    return this.get(`Event/${eventId}`, false);
  }

  private get<T>(path: string, skipCache: boolean = false): Observable<T> {
    if (this.cache.hasCachedData(path)) {
      return this.cache
        .getCachedData<T>(path)
        .pipe(map((cachedData) => cachedData.data));
    }

    const apiUrl = `${environment.sportsdata.baseUrl}/${path}?key=${environment.sportsdata.apiKey}`;
    return this.http.get<T>(apiUrl).pipe(
      tap((response) => {
        if (!skipCache) {
          this.cache.cacheData(path, response);
        }
      })
    );
  }
}
