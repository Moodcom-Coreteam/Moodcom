import {Injectable} from '@angular/core';


@Injectable()
export class Globals {

  feelingsLabels = ['Colère', 'Déception', 'Joie', 'Amour', 'Tristesse', 'Optimisme'];
  feelings = ['anger', 'disappointment', 'joy', 'love', 'sadness', 'optimism'];
  colorsCharts = ["#FFA14A", "#7CB5EC", "#90ed7d", "#be47b7", "#fde47f", "#f54f4d"] ;

  getApiUrl() {
    if (globalThis.api !== undefined) {
      return globalThis.api.url;
    } else {
      return 'https://moodcom-development.ew.r.appspot.com/';
    }
  }

}
