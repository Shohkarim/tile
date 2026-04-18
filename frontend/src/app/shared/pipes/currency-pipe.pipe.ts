import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === null || value === undefined) {
      return '';
    }

    const num = Number(value);

    if (isNaN(num)) {
      return '';
    }

    return `${num}₽`;
  }

}
