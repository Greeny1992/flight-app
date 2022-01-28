import { TestBed } from '@angular/core/testing';

import { FlightTypeaheadService } from './flight-typeahead.service';

describe('FlightTypeaheadService', () => {
  let service: FlightTypeaheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightTypeaheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
