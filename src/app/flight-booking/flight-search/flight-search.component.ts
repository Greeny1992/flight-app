import { Component, OnInit } from '@angular/core';
import { DummyFlightService } from '../dummy-flight.service';
import { Flight } from '../flight';
import { FlightClass } from '../flight-class';
import { FlightService } from '../flight.service';
import { LuggageOption } from '../luggage-option';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  from = "Hamburg"
  to = "Graz"
  delayedFilter = false
  nonstop: boolean = false;
  flights: Array<Flight> = []
  selectedFlight: Flight | null = null
  basket: { [key: number]: boolean }= {
    3:true,
    5: true
  }
  date: string = (new Date()).toISOString()
  flightClasses: FlightClass[] = [
    {id: 1, name: "1st Class"},
    {id: 2, name: "Business Class"},
    {id: 3, name: "Economy Class"},
  ]

  flightClass = this.flightClasses[2];

  luggageOptions: LuggageOption[] = [
    {id: 0, name: "No luggage"},
    {id: 1, name: "1 piece of luggage"},
    {id: 2, name: "2 pieces of luggage"}
  ]

  luggage = this.luggageOptions[2]

  constructor(private flightService: FlightService) { 
    if(flightService instanceof DummyFlightService) {
      console.debug("Eigentlich dummy")
    }
  }

  ngOnInit(): void {
  }

  search(): void {
    if(!this.from || !this.to) {
      return
    }
    
    this.flightService.find(this.from, this.to).subscribe({
      next: (f) => {
        this.flights = f
      },
      error: (err) => {
        console.error("Error", err)
      }
    })
  }

  select(f: Flight): void {
    this.selectedFlight = f
  }

  

}
