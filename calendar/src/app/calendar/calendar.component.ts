import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  weekdays: string[] = [];
  months: string[] = [];
  days: Date[] = [];
  currentDate: Date = new Date();
  emptyDays: string[] = [];
  endingEmpties: string[] = [];
  selected: Date = new Date();
  rowHeight!: string;

  constructor(private service: CalendarService, private breakpointObserver: BreakpointObserver) {
    [this.weekdays, this.months] = [this.service.weekdays, this.service.months];
  }

  ngOnInit(): void {
    this.rowHeight="2:1";
   this.detectBreakpoint();

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

  updateEmpties() {
    this.emptyDays = this.service.getStartOfMonth(this.days);
    this.endingEmpties = this.service.getEndOfMonth(this.days, this.emptyDays);
  }
  
  nextMonth() {
    if (this.days[0].getMonth() < 11) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate);
      
      this.days = this.service.getDaysInMonth(
        this.currentDate.getMonth(),
        this.currentDate.getFullYear()
        );
        this.updateEmpties();
      } else if (this.days[0].getMonth() === 11) {
        this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
        this.currentDate.setMonth(0);
        this.currentDate = new Date(this.currentDate);
        this.days = this.service.getDaysInMonth(
          this.currentDate.getMonth(),
          this.currentDate.getFullYear()
        );
        this.updateEmpties();
      }
      this.selected = new Date(this.currentDate.setDate(1));
    }
    
    previousMonth() {
      if (this.days[0].getMonth() > 0) {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.currentDate = new Date(this.currentDate);
        this.days = this.service.getDaysInMonth(
          this.currentDate.getMonth(),
          this.currentDate.getFullYear()
          );
          this.updateEmpties();
        } else if (this.days[0].getMonth() === 0) {
          this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
          this.currentDate.setMonth(11);
          this.currentDate = new Date(this.currentDate);
          
          this.days = this.service.getDaysInMonth(
            this.currentDate.getMonth(),
            this.currentDate.getFullYear()
            );
            this.updateEmpties();
          }
          this.selected = new Date(this.currentDate.setDate(1));
        }
        
        isSelected(day: Date){
          return day.getDate() === this.selected.getDate()? true : false;
          
        }
        
        setSelected(day: Date){
      this.selected = new Date(day);
      
    }


    private detectBreakpoint(): void {
      this.breakpointObserver.observe(['(max-width: 1100px)']).subscribe(result => {
        this.rowHeight = result.matches ? '15vh' : '2:1';
      });
    }

  }
