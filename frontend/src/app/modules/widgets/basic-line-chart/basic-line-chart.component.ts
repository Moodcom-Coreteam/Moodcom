import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../../models/video.model';
import {Globals} from '../../../services/globals';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-basic-line-chart',
  templateUrl: './basic-line-chart.component.html',
  styleUrls: ['./basic-line-chart.component.scss']
})
export class BasicLineChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  @Input() videos: Video[];
  @Input() video: Video;
  @Input() withHistory: boolean;

  constructor(public globals: Globals) { }

  ngOnInit(): void {

    const feelingsLabels = this.globals.feelingsLabels;
    const feelings = this.globals.feelings;

    const sortedVideos = this.videos.slice().sort(
      (a, b) => {
        const dateB = b.publishedAt.split('/');
        const dateA = a.publishedAt.split('/');
        return new Date(dateA[1] + '/' + dateA[0] + '/' + dateA[2]).getTime() -  new Date(dateB[1] + '/' + dateB[0] + '/' + dateB[2]).getTime();
      }
    );

    function firstLetterToUppercase(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    feelings.forEach( feeling => {
      window['data' + firstLetterToUppercase(feeling)] = [];
    });

    const i = this.withHistory ? 1 : 0;


    // Create categories
    const categories = [];
    sortedVideos.forEach( video => {
      categories.push(video.publishedAt);
      feelings.forEach( feeling => {
        window['data' + firstLetterToUppercase(feeling)].push(video.getFeeling(feeling, i) * 100);
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

    const text = this.withHistory ? 'Dernière analyse en fonction de la sortie des vidéos':
      'Analyse du jour en fonction de la sortie des vidéos';

    this.chartOptions = {
      colors: this.globals.colorsCharts,
      title: {
        text
      },

      yAxis: {
        title: {
          text: 'Pourcentage de chaque sentiment'
        }
      },

      xAxis: {
        categories
      },

      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },

      plotOptions: {
        column: {
          stacking: 'percent'
        }
      },
      tooltip: {
        formatter() {
          return sortedVideos[this.point.x].title + ' : <b>' + this.y + ' % </b>';
        }
      },
      series

    };
    HC_exporting(Highcharts);

  }

}
