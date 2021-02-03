// Modules angular
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

// Autres
import { Video } from 'src/app/models/video.model';
import { Globals } from 'src/services/globals';

@Component({
  selector: 'app-stacked-column-chart',
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.scss'],
})
export class StackedColumnChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  @Input() videos: Video[];
  isLightMode: boolean;

  constructor(private globals: Globals) { }

  ngOnInit(): void {
    const feelingsLabels = this.globals.feelingsLabels;
    const feelings = this.globals.feelings;


    function firstLetterToUppercase(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    feelings.forEach(feeling => {
      window['data' + firstLetterToUppercase(feeling)] = [];
    });

    // Création de catégories
    const categories = [];
    this.videos.forEach(video => {
      categories.push(video.title);
      feelings.forEach(feeling => {
        window['data' + firstLetterToUppercase(feeling)].push(video.getFeeling(feeling));
      });
    });

    /**
     * FONCTION DE TEST
     */
    /*const categories = [];
    this.videos.forEach( video => {
      categories.push(video.title);
      feelings.forEach( feeling => {
        window['data' + firstLetterToUppercase(feeling)].push(video.analysis[feeling]);
      });
    });*/

    // Création de données pour les catégories
    const series = [];
    feelings.forEach((feeling, index) => {
      series.push({
        name: feelingsLabels[index],
        data: window['data' + firstLetterToUppercase(feeling)]
      });
    });

    /**
     * Définition des options du chart
     */
    this.chartOptions = {
      chart: {
        type: 'column',
        marginTop: 50
      },
      title: {
        text: 'Analyse des sentiments',
        align: 'center'
      },
      xAxis: {
        categories
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Pourcentage de chaque sentiment',
          margin: 50
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        itemDistance: 60,
        margin: 30,
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
