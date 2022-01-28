import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city',
  pure: true
})
export class CityPipe implements PipeTransform {

  transform(value: string | undefined, format: "long" | "short"): string |undefined {
    let short
    let long
    switch (value) {
      case "Graz": 
        short = "GRZ"
        long = "Flughafen Graz Thalerhof"        
        break;
      case "Hamburg":
        short = "HAM"
        long = "Aiprot Hamburg Fuhlsbüttel Helmut Schmidt"
        break    
      default:
        short = long = value
        break;
    }

    return format === "long" ? long : short
  }

}
