import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hufcurrency',
  standalone: true
})
export class HufcurrencyPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    const rounded = Math.round(num); // <-- round to nearest integer
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

}
