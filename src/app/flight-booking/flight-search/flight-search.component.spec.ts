import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DummyFlightService } from '../dummy-flight.service';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightService } from '../flight.service';
import { FlightSearchComponent } from './flight-search.component';

fdescribe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let flightService: FlightService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, SharedModule, FormsModule],
      declarations: [ FlightSearchComponent, FlightCardComponent ],
      providers: [
        { provide: FlightService, useClass: DummyFlightService}
      ]
    })
    .compileComponents();

    TestBed.overrideComponent(FlightSearchComponent, {
      set: {
        providers: [
          { provide: FlightService, useClass: DummyFlightService}
        ]
      }
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flightService = fixture.debugElement.injector.get(FlightService)
    spyOn(flightService, "find").and.callThrough()
  });

  it('should have no loaded flights initially', () => {
    expect(component.flights.length).toBe(0);
  });

  it("should search f when from and to are given", () => {
    component.from = "Hamburg"
    component.to = "Graz"
    component.search()
    expect(component.flights.length).toBe(3)

    expect(flightService.find).toHaveBeenCalled()
  })

  it("should not search f without from and to ", () => {
    component.from = ""
    component.to = ""
    component.search()

    expect(component.flights.length).toBe(0)
    expect(flightService.find).not.toHaveBeenCalled()
  })
});
