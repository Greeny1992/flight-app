import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { asyncCityValidator } from 'src/app/shared/validation/reactive/async-city-validator';
import { cityValidator } from 'src/app/shared/validation/reactive/city-validator';
import { cityWithParamsValidator } from 'src/app/shared/validation/reactive/city-with-params-validator';
import { roundTripValidator } from 'src/app/shared/validation/reactive/roud-trip-validator';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
})
export class FlightEditComponent implements OnInit {
  id = 0;
  showDetails = false;
  formGroup: FormGroup;
  routeFormGroup: FormGroup;
  categoriesFormArray: FormArray;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private flightService: FlightService
  ) {
    this.categoriesFormArray = fb.array([]);
    this.routeFormGroup = fb.group(
      {
        from: [
          'Graz',
          [
            Validators.required,
            Validators.minLength(3),
            cityWithParamsValidator([
              'Tippsdrill',
              'Graz',
              'Hamburg',
              'Zürich',
            ]),
          ],
          [asyncCityValidator(flightService)],
        ],
        to: ['Hamburg'],

      },
      { validators: [roundTripValidator()], updateOn: 'blur' }
    );
    this.formGroup = fb.group({
      id: [],
      route: this.routeFormGroup,
      date: [],
      delayed: [],
      categories: this.categoriesFormArray
    })

    this.formGroup.statusChanges.subscribe((value) =>
      console.debug('whole form changed', value)
    );

    this.formGroup.controls['delayed'].statusChanges.subscribe((value) =>
      console.debug('Delayed changed', value)
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  save(): void {
    console.debug('form to save', this.formGroup.value);
    console.debug('id', this.formGroup.controls['id'].value);
  }

  addCategory(): void {
    this.categoriesFormArray.push(
      this.fb.group({
        categoryName: ["Test"],
        basePrice: []
      })
    )
  }
}
