import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from '../flight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent {

  @Input() item: Flight | null = null
  @Input() selected = false
  @Output() selectChange = new EventEmitter<boolean>()

  onSelect() {
    this.selected = !this.selected
    this.selectChange.emit(this.selected)
  }
}
