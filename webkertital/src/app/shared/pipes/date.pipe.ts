import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class DatePipe implements PipeTransform {

  transform(value: any): string {
    if(!value) return '';

    let date: Date;
    if(value.toDate){
      date = value.toDate();
    } else {
      date = new Date(value);
    }

    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

}
