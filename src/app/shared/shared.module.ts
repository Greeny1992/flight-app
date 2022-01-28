import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './city.pipe';
import { DateComponent } from './date/date.component';
import { StatusColorPipe } from './status-color.pipe';
import { StatusFilterPipe } from './status-filter.pipe';
import { FormsModule } from '@angular/forms';
import { CityValidationDirective } from './validation/city-validation.directive';
import { RoundTripValidationDirective } from './validation/round-trip-validation.directive';
import { AsyncCityValidationDirective } from './validation/async-city-validation.directive';
import { ValidationErrorsComponent } from './validation/validation-errors/validation-errors.component';



@NgModule({  
  imports: [
  CommonModule,
  FormsModule
],
  declarations: [
    DateComponent,
    CityPipe,
    StatusFilterPipe,
    StatusColorPipe,
    CityValidationDirective,
    RoundTripValidationDirective,
    AsyncCityValidationDirective,
    ValidationErrorsComponent
  ],
  exports: [
    DateComponent,
    CityPipe,
    StatusFilterPipe,
    StatusColorPipe,
    CommonModule,
    CityValidationDirective,
    RoundTripValidationDirective,
    AsyncCityValidationDirective,
    ValidationErrorsComponent
  ]

})
export class SharedModule { }
