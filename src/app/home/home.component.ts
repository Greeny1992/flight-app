import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Flight } from '../flight-booking/flight';
import { simpleObservable } from '../shared/observable-factories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Flight>("http://www.angular.at/api/flight/3").pipe(map(fl => new Date(fl.date))).subscribe({
      next: (val: any) => console.log("date", val),
      error: (err: any) => console.error('error', err), complete: () => console.log("complete")
    })

    const simple$ = simpleObservable();
    const sub = simple$.subscribe({
      next: value => console.log("next", value),
      error: err => console.error("error", err),
      complete: () => console.log("complete")  
    })

    setTimeout(() => sub.unsubscribe(), 2500)
  }

}
