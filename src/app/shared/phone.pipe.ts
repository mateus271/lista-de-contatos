import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: false
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const digits = value.replace(/\D/g, '');

    if (digits.length <= 10) {
      // Format as (XX) XXXX-XXXX
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      // Format as (XX) XXXXX-XXXX
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  }
}
