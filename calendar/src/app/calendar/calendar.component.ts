import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  weekdays: string[] = [];
  months: string[] = [];
  days: Date[] = [];
  currentDate = new Date();
  emptyDays: string[] = [];
  endingEmpties: string[] = [];

  constructor(private service: CalendarService) {
    [this.weekdays, this.months] = [this.service.weekdays, this.service.months];
  }
  
  ngOnInit(): void {
    this.days = this.service.getDaysInMonth(
      this.currentDate.getMonth(),
      this.currentDate.getFullYear()
    );
   this.updateEmpties();
  }

  isWeekend(day: Date) {
    if (day.getDay() === 0 || day.getDay() === 6) {
      return true;
    }
    return false;
  }

  updateEmpties(){
    this.emptyDays = this.service.getStartOfMonth(this.days);
    this.endingEmpties = this.service.getEndOfMonth(this.days, this.emptyDays);
  }

  nextMonth() {
    
    if (this.days[0].getMonth() < 11) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.days = this.service.getDaysInMonth(
        (this.currentDate.getMonth()),
        this.currentDate.getFullYear()
        );
        this.updateEmpties();
        
      } else if (this.days[0].getMonth() === 11) {
      this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
      this.days = this.service.getDaysInMonth(
        (this.currentDate.getMonth() - 9),
        this.currentDate.getFullYear() 
      );
   this.updateEmpties();

    }
  }

  previousMonth() {
    
    if (this.days[0].getMonth() > 0) {
      this.currentDate.setMonth(this.currentDate.getMonth()-1);
      this.days = this.service.getDaysInMonth(
        (this.currentDate.getMonth()),
        this.currentDate.getFullYear()
        );
        this.updateEmpties();
        
      } else if (this.days[0].getMonth() === 0) {
      
      this.currentDate.setFullYear(this.currentDate.getFullYear()-1);

      this.days = this.service.getDaysInMonth(
        (this.currentDate.getMonth() + 9),
        (this.currentDate.getFullYear())
      );
   this.updateEmpties();

    }
  }



}
