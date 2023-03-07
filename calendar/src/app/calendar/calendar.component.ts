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


  constructor(service: CalendarService) { 
    let currentDate = new Date();
   [this.weekdays,this.months] = [service.weekdays,service.months];
   this.days = service.getDaysInMonth(currentDate.getMonth(),currentDate.getFullYear());

  }

  ngOnInit(): void {
  }

}
