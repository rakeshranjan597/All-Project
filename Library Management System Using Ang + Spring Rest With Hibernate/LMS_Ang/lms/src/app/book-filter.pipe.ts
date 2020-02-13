import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(getAllBookTransactionDetails, sid: string) {
    if (sid) {
      return getAllBookTransactionDetails.filter(val => val.sid == sid);
    }
  }

}
