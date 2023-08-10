import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {

  today = new Date();

  constructor() {}

  subTractYears = (date: Date, years: number) => {
    date.setFullYear(date.getFullYear() - years);
    return date;
  };
}
