import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNoPipe'
})
export class YesNoPipePipe implements PipeTransform {

  transform(value :any): string {
    return(value==1 ? "Yes":(value=="1" ? "Yes":"No"));
  }

}
