import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightTypeaheadService } from './flight-typeahead.service';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.scss']
})
export class FlightTypeaheadComponent implements OnInit {

  flights$ = this.service.flight$
  online$ = this.service.online$
  error$ = this.service.error$  

  control = new FormControl()
  constructor(private service: FlightTypeaheadService) {
   }


  ngOnInit(): void {
    this.control.valueChanges.subscribe(from => {
      this.service.search(from)
    })
  }

  refresh(): void {
    this.service.refresh()
  }

  clearError(): void {
    this.service.clearError()
  }

}
