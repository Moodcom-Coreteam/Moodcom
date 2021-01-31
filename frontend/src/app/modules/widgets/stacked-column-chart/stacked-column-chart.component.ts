import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {Video} from '../../../models/video.model';
import HC_exporting from 'highcharts/modules/exporting';
import {Globals} from '../../../services/globals';
import {SharedService} from '../../../services/shared.service';


@Component({
  selector: 'app-stacked-column-chart',
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.scss']
})
export class StackedColumnChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  @Input() videos: Video[];
  isLightMode: boolean;
  @Input() withHistory: boolean;

  constructor(private globals: Globals,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    // this.sharedService.getWithHistoryEvent().subscribe(() => {
    //   // on affiche l'historique
    //   this.getChartOptionsWithHistory(true);
    // });
    // this.sharedService.getWithoutHistoryEvent().subscribe(() => {
    //   // on affiche pas l'historique
    //   this.getChartOptionsWithHistory(false);
    // });
    // this.getChartOptionsWithHistory(false);
    this.getChartOptionsWithHistory(this.withHistory);
  }

  /**
   * Méthode qui permet de récupérer les données du graphique
   * @param withHistory true s'il faut afficher l'historique, false sinon
   */
  private getChartOptionsWithHistory(withHistory: boolean) {
    const feelingsLabels = this.globals.feelingsLabels;
    const feelings = this.globals.feelings;
    const colors = this.globals.colorsCharts;

    function firstLetterToUppercase(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Création des variables
    feelings.forEach(feeling => {
      window['data0' + firstLetterToUppercase(feeling)] = [];
      if (withHistory) {
        window['data1' + firstLetterToUppercase(feeling)] = [];
      }
      window['color' + firstLetterToUppercase(feeling)] = '';
    });

    // Create categories
    const categories = [];
    this.videos.forEach(video => {
      categories.push(video.title);
      feelings.forEach((feeling, index) => {
        window['data0' + firstLetterToUppercase(feeling)].push(video.getFeeling(feeling, 0));
        if (withHistory) {
          window['data1' + firstLetterToUppercase(feeling)].push(video.getFeeling(feeling, 1));
        }
        window['color' + firstLetterToUppercase(feeling)] = colors[index];
      });
    });

    // Create data for series
    let series = new Array(6);
    if (withHistory) {
      series = new Array(12);
    }
    feelings.forEach((feeling, index) => {
      series[index] = {
        name: feelingsLabels[index],
        data: window['data0' + firstLetterToUppercase(feeling)],
        color: window['color' + firstLetterToUppercase(feeling)],
        stack: 'group0'
      };
      // S'il y a un historique, on rajoute une 2ème colonne
      if (withHistory) {
        series[index + 6] = {
          name: feelingsLabels[index],
          data: window['data1' + firstLetterToUppercase(feeling)],
          stack: 'group1',
          color: window['color' + firstLetterToUppercase(feeling)],
          showInLegend: false
        };
      }
    });
    let text;
    if (withHistory) {
      text = 'Analyse des sentiments avec historique';
    } else {
      text = 'Analyse des sentiments';
    }

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      colors: this.globals.colorsCharts,
      title: {
        text
      },
      xAxis: {
        categories
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Pourcentage de chaque sentiment'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true,
      },
      plotOptions: {
        column: {
          stacking: 'percent'
        }
      },
      series
    };

    HC_exporting(Highcharts);

  }


}
