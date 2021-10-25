import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CachedData<T> {
  from: number;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
  public hasCachedData(key: string): boolean {
    return  this.isValid(key);
  }

  public getCachedData<T>(key: string): Observable<CachedData<T>> {
    return of(JSON.parse(localStorage.getItem(key) ?? '{}'));
  }

  public cacheData<T = any>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify({
      from: new Date().getTime(),
      data: data,
    } as CachedData<T>));
  }

  private isValid(key: string): boolean {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue === undefined || cachedValue === null) return false;

    const validDateRange = 7 * 24 * 60 * 60 * 1000; // 7 Days
    const parsedValue = JSON.parse(cachedValue);
    return (new Date().getTime() - parsedValue?.from) < validDateRange;
  }
}
