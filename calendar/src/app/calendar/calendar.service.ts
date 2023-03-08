import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  weekdays: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];


  currentDate: Date = new Date();
  currentDate$ = new BehaviorSubject(this.currentDate);
  date$ = this.currentDate$.asObservable();

  constructor() {}

  getDaysInMonth = (month: number, year: number) => {
    let date = new Date(year, month, 1);
    let days: Date[] = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  getStartOfMonth(days: Date[]) {
    let emptyDays: string[] = [];

    let weekStart: any = days[0].getDay();

    if (weekStart > 0) {
      for (let i = weekStart; i > 0; i--) {
        emptyDays.push('');
      }
    }

    return emptyDays;
  }

  getEndOfMonth(days: Date[], empty: string[]) {
    let total: number = days.length + empty.length;

    let leftOvers: number = total > 35 ? 42 - total : 35 - total;

    let endingEmpties: string[] = [];

    if (leftOvers > 0) {
      for (let i = leftOvers; i > 0; i--) {
        endingEmpties.push('');
      }
    }

    return endingEmpties;
  }

setDate(newDate: Date){
  this.currentDate = newDate;
  this.currentDate$.next(newDate);

}

}
