import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultFlightService } from './default-flight.service';
import { DummyFlightService } from './dummy-flight.service';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root',
  useClass: DefaultFlightService
})
export abstract class FlightService {
  abstract find(from: string, to: string): Observable<Flight[]>
}
