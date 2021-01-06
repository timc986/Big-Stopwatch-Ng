import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserSettingService {
  private isDarkThemeSource = new Subject<boolean>();
  public isDarkTheme$ = this.isDarkThemeSource.asObservable();
  public isDarkThemeSync = true;

  constructor() { }

  public setIsDarkTheme(isDarkTheme: boolean): void {
    this.isDarkThemeSource.next(isDarkTheme);
  }

  // use for oninit to set the value in the beginning
  public setIsDarkThemeSync(isDarkTheme: boolean): void {
    this.isDarkThemeSync = isDarkTheme;
  }
}