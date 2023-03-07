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


  constructor(service: CalendarService) { 
   [this.weekdays,this.months] = [service.weekdays,service.months];
   this.days = service.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());

  }

  ngOnInit(): void {
  }

}
