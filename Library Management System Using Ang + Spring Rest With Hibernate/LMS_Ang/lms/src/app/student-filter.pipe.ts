import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {

  transform(getAllStudentsDetails, sid: string) {
    if (sid) {
      return getAllStudentsDetails.filter(val => val.sid == sid);
    }
  }

}
