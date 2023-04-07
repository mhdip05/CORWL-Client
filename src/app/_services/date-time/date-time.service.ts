import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  
  constructor() {}

  subTractYears = (date: Date, years: number) => {
    date.setFullYear(date.getFullYear() - years);
    return date;
  };
}
