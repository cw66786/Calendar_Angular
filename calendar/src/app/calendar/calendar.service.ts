import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  weekdays: string[] = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
  months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  

  constructor() { }
  

   getDaysInMonth = (month: number, year: number)=> {
    let date = new Date(year, month, 1);
    let days: Date[] = [];
   
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    
    
     return days;
  }


  getStartOfMonth(days: Date []){
    let emptyDays: string[] = [];

    let weekStart: any = days[0].getDay();
    
    if(weekStart > 0){
      for(let i = weekStart; i > 0; i--){
          emptyDays.push('');
      }
    }

    return emptyDays;
  }


  getEndOfMonth(days: Date[],empty: string []){
    let total: number = days.length + empty.length;

    let leftOvers: number = 35 - total;

    let endingEmpties: string[] = [];

    if(leftOvers > 0){
      for(let i = leftOvers; i > 0; i--){
          endingEmpties.push('');
      }
    
    }
    
    return endingEmpties;
  }

}
