import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformSeconds'
})
export class TransformSecondsPipe implements PipeTransform {

  transform(value: any): string {
    const hours = Math.floor(value / 3600);
    value %= 3600; 
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${hours}h : ${minutes}m : ${seconds}s`;
  }

}

// TRANSFORMING SECONDS IN HOURS / MINUTES / SECONDS FORMAT, SINCE STORING SECONDS ONLY