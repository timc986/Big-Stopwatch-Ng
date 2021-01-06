import { Component, HostListener, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { CurrentUserSettingService } from '../service/current-user-setting.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

  public isRunning = false;
  public hasTime = false;
  public time = 0;
  public hour = '00';
  public minute = '00';
  public second = '00';
  public millisecond = '00';
  public isDarkTheme = true;

  constructor(
    private currentUserSettingService: CurrentUserSettingService
  ) {
    this.isDarkTheme = currentUserSettingService.isDarkThemeSync;
  }

  ngOnInit(): void {
    timer(0, 10).subscribe(t => {
      if (this.isRunning) {
        this.time++;
        this.hasTime = true;

        this.hour = this.formatZero(Math.floor(this.time / 360000));
        this.minute = this.formatZero(Math.floor(this.time / 6000 % 60));
        this.second = this.formatZero(Math.floor(this.time / 100 % 60));
        this.millisecond = this.formatZero(Math.floor(this.time % 100));
      }
    });
    this.currentUserSettingService.isDarkTheme$.subscribe(
      isDarkTheme => {
        this.isDarkTheme = isDarkTheme;
      }
    );
  }

  public toggle(): void {
    this.isRunning = !this.isRunning;
  }

  public reset(): void {
    this.isRunning = false;
    this.hasTime = false;
    this.time = 0;
    this.hour = '00';
    this.minute = '00';
    this.second = '00';
    this.millisecond = '00';
  }

  @HostListener('window:keyup.space', ['$event'])
  onSpacebar() {
    this.toggle();
  }

  private formatZero(time: number): string {
    if (time < 10) {
      return '0' + time.toString();
    } else {
      return time.toString();
    }
  }
}
