import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

  public isRunning = false;
  public time = 0;
  public hour = '00';
  public minute = '00';
  public second = '00';
  public millisecond = '00';

  constructor() { }

  ngOnInit(): void {
    timer(0, 10).subscribe(t => {
      if (this.isRunning) {
        this.time++;

        this.hour = this.formatZero(Math.floor(this.time / 360000));
        this.minute = this.formatZero(Math.floor(this.time / 6000 % 60));
        this.second = this.formatZero(Math.floor(this.time / 100 % 60));
        this.millisecond = Math.floor(this.time % 100).toString();
      }
    });
  }

  public toggle(): void {
    this.isRunning = !this.isRunning;
  }

  public reset(): void {
    this.isRunning = false;
    this.time = 0;
    this.hour = '00';
    this.minute = '00';
    this.second = '00';
    this.millisecond = '00';
  }

  private formatZero(time: number): string {
    if (time < 10) {
      return '0' + time.toString();
    } else {
      return time.toString();
    }
  }
}