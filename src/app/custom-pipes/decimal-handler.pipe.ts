import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalWithTwoDigits'
})
export class DecimalHandlerPipe implements PipeTransform {

  transform(value: any): any {
    return value.toFixed(2);
  }

}
