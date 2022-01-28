import { Injectable } from '@angular/core';
import { distinctUntilChanged, interval, map, shareReplay, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineService {
  readonly online$ = interval(2000).pipe(
    startWith(0),
    map(_ => Math.random() < 0.5),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: true})
  );
  constructor() {}
}
