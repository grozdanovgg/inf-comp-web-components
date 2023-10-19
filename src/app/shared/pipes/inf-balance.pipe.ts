import { Pipe, PipeTransform } from '@angular/core';
import Big from 'big.js';

@Pipe({
  name: 'infBalance'
})
export class InfBalancePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Big(value).div(100_000_000).toNumber();
  }

}
