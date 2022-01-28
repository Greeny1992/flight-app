import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, debounceTime, filter, map, merge, Observable, of, Subject, switchMap, withLatestFrom } from 'rxjs';
import { Flight } from '../flight-booking/flight';
import { FlightService } from '../flight-booking/flight.service';
import { OnlineService } from './online.service';

@Injectable({
  providedIn: 'root'
})
export class FlightTypeaheadService {

  // Datenquelle
  private fromSubject = new BehaviorSubject<string>('');
  private refreshSubject = new Subject<void>()
  readonly online$ = this.onlineService.online$

  // Datensenke
  readonly flight$: Observable<Flight[]>
  errorSubject = new Subject<unknown>()
  readonly error$ = this.errorSubject.asObservable()


  constructor(private flightService: FlightService, private onlineService: OnlineService) { 
    const debounceTime$ = this.fromSubject.pipe(
      filter(input => input.length >= 3),
      debounceTime(300)
    )

    const inputRequest$ = combineLatest([debounceTime$, this.online$])

    const refreshRequest$ = this.refreshSubject.pipe(
      switchMap(_ => this.fromSubject),
      withLatestFrom(this.online$)
    )

    this.flight$ = merge(inputRequest$, refreshRequest$).pipe(
      filter(([_, online]) => online),
      map(([input, _]) => input),
      switchMap(input => this.load(input))
    )
  }

  search(from: string): void {
    this.fromSubject.next(from)
  }

  refresh(): void {
    this.refreshSubject.next()
  }

  clearError(): void {
    this.errorSubject.next(null)
  }

  private load(from: string) {
    return this.flightService.find(from, '').pipe(
      catchError(err => {
        this.errorSubject.next(err)
        return of([])
      })
    )
  }
 }
