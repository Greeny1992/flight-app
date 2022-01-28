import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../flight-booking/flight';

@Pipe({
  name: 'statusFilter',
  pure: true
})
export class StatusFilterPipe implements PipeTransform {

  transform(value: Flight[], delayedFilter: boolean | undefined): Flight[] {
    if(typeof delayedFilter === "undefined") {
      return value
    }
    return value.filter(f => f.delayed === delayedFilter)
  }

}
