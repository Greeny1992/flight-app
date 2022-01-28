import { AbstractControl, ValidatorFn } from "@angular/forms";

export const cityValidator: ValidatorFn = (control: AbstractControl) => {
    if(control.value === "Graz" || control.value ==="Hamburg" || control.value === "Frankfurt" || control.value === "Berlin" ||control.value === "Wien") {
        return null
    } 
    return {city: true}
}