import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isDarkTheme = true;

  public onDarkTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
