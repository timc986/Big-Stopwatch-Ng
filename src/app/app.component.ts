import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CurrentUserSettingModel } from './model/current-user-setting.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isDarkTheme = true;
  private currentUserSettingLocalStorageName = 'stopwatch-setting';
  private currentUserSettingSubject: BehaviorSubject<CurrentUserSettingModel>;
  private currentUserSetting: Observable<CurrentUserSettingModel>;

  constructor() {
    const localStorageItem = localStorage.getItem(this.currentUserSettingLocalStorageName);
    if (localStorageItem) {
      this.currentUserSettingSubject = new BehaviorSubject<CurrentUserSettingModel>(JSON.parse(localStorageItem));
    } else {
      this.currentUserSettingSubject = new BehaviorSubject<CurrentUserSettingModel>(new CurrentUserSettingModel());
    }
    this.currentUserSetting = this.currentUserSettingSubject.asObservable();
  }

  ngOnInit(): void {
    if (this.currentUserSettingValue !== null) {
      if (this.currentUserSettingValue.isDarkTheme === false) {
        this.isDarkTheme = false;
      }
      else {
        this.isDarkTheme = true;
      }
    }
  }

  public onDarkTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      const userSetting = new CurrentUserSettingModel();
      userSetting.isDarkTheme = true;
      localStorage.setItem(this.currentUserSettingLocalStorageName, JSON.stringify(userSetting));
    } else {
      const userSetting = new CurrentUserSettingModel();
      userSetting.isDarkTheme = false;
      localStorage.setItem(this.currentUserSettingLocalStorageName, JSON.stringify(userSetting));
    }
  }

  public get currentUserSettingValue(): CurrentUserSettingModel | null {
    if (this.currentUserSettingSubject) {
      return this.currentUserSettingSubject.value;
    }
    return null;
  }
}
