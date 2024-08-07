import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    // Eğer value bir string ise Date nesnesine dönüştür
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return ''; // Geçersiz tarih kontrolü

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

}
