import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(getAllProduct, search: string) {
    if (search === undefined) {
      return getAllProduct;
    } else {
      return getAllProduct.filter(val => val.name === search || val.category === search || val.company === search);
    }
  }

}
