import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor() {
  }

  isLightMode: boolean = false;

  @HostBinding('class')
  get themeMode() {
    return this.isLightMode ? 'lightMode' : 'darkMode';
  }

  switchMode(isLight: boolean) {
    this.isLightMode = isLight;
  }

  ngOnInit(): void {
  }

}
