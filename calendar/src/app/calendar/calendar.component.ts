import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weekdays: string[];
  months: string[];
  days: Date[];
  currentDate = new Date();
  emptyDays: string[];
  endingEmpties: string[];


  constructor(service: CalendarService) { 
   [this.weekdays,this.months] = [service.weekdays,service.months];
   this.days = service.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());
    this.emptyDays = service.getStartOfMonth(this.days);
    this.endingEmpties = service.getEndOfMonth(this.days,this.emptyDays);
  }

  ngOnInit(): void {
  }


  
isWeekend(day: Date){
  if(day.getDay() === 0 || day.getDay() === 6 ){
    return true;
  }
  return false;
 

}


}
