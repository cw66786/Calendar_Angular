import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  weekdays: string[] = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];

  


  constructor() { }
}
