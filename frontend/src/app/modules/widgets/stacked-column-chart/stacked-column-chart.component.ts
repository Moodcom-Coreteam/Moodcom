import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {Video} from '../../../models/video.model';
import HC_exporting from 'highcharts/modules/exporting';
import {Globals} from '../../../services/globals';


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

  constructor(private globals: Globals) { }

  ngOnInit(): void {
    const feelingsLabels = this.globals.feelingsLabels;
    const feelings = this.globals.feelings;


    function firstLetterToUppercase(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    feelings.forEach( feeling => {
      window['data' + firstLetterToUppercase(feeling)] = [];
    });

    // Create categories
    const categories = [];
    this.videos.forEach( video => {
      categories.push(video.title);
      feelings.forEach( feeling => {
        window['data' + firstLetterToUppercase(feeling)].push(video.getFeeling(feeling));
      });
    });

    // Create data for series
    const series = [];
    feelings.forEach( (feeling, index) => {
      series.push({
        name: feelingsLabels[index],
        data: window['data' + firstLetterToUppercase(feeling)]
      });
    });

      this.chartOptions = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Analyse des sentiments',
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
          shared: true
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
