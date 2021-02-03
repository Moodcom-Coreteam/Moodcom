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

  ngOnInit(): void {
  }

  @HostBinding('class')
  get themeMode() {
    return this.isLightMode ? 'lightMode' : 'darkMode';
  }

  switchMode(isLight: boolean) {
    this.isLightMode = isLight;
  }

  ngOnDestroy() {
  }

}
