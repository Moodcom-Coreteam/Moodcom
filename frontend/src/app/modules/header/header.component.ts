import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  lightMode: boolean = false;

  @Output()
  readonly lightModeSwitched = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    this.lightModeSwitched.emit(false);
  }

  onDarkModeSwitched({checked}: MatSlideToggleChange) {
    this.lightMode = !this.lightMode;
    this.lightModeSwitched.emit(checked);
  }
}
