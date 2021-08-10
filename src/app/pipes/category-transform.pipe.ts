import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
  {
    name: 'category'
  }
)
export class CategoryTransformPipe implements PipeTransform {
  transform(value: string[]): string | string[] {
    if(!value.length) return 'none';
    return value
  }
}
