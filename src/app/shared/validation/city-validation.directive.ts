import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'input[appCity]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CityValidationDirective,
      multi: true
    }
  ]
})
export class CityValidationDirective implements Validator {

  @Input() appCity = ""
  @Input() strict = false
  public validate(control: AbstractControl): ValidationErrors | null {
      const allowedCities = this.appCity.split(',');
      if(allowedCities.includes(control.value)) {
        return null
      }
       return {
         appCity: {
           reason: 'Requested Airport is currently not available',
           allowedCities: ["Graz", "Hamburg", "Frankfurt", "Wien", "Mallorca"],
           tryAgain: 2031
         }
       }
  }

}
