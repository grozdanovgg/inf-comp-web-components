import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitWords',
})
export class SplitWordsPipe implements PipeTransform {
  transform(text: string) {
    return text.split(/(?=[A-Z])/).join(' ');
  }
}
