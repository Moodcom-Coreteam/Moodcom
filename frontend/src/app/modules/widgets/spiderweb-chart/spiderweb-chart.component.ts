import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../../models/video.model';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {Globals} from '../../../services/globals';


@Component({
  selector: 'app-spiderweb-chart',
  templateUrl: './spiderweb-chart.component.html',
  styleUrls: ['./spiderweb-chart.component.scss'],
})
export class SpiderwebChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  @Input() videos: Video[];
  @Input() video: Video;

  constructor(public globals: Globals) { }

  ngOnInit(): void {

    const feelingsLabels = this.globals.feelingsLabels;
    const feelings = this.globals.feelings;
    const series = [];

    function addVideoToSerie(video: Video) {
      const name = video.title;
      const data = [];
      feelings.forEach( feeling => {
        data.push(video.getFeeling(feeling));
      });
      series.push({name, data});
    }

    // create data for series
    if (this.videos){
      this.videos.forEach( video => {
        addVideoToSerie(video);
      });
    } else if (this.video){
      addVideoToSerie(this.video);
    }

    this.chartOptions = {
      chart: {
        polar: true,
        type: 'line',
      },
      title: {
        text: 'Analyse des sentiments',
        x: -80
      },

      pane: {
        size: '90%'
      },

      xAxis: {
        categories: feelingsLabels,
        tickmarkPlacement: 'on',
        lineWidth: 0
      },

      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
        shared: true,
      },

      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        // width: '50%'
      },
      series
    };
    HC_exporting(Highcharts);

  }



}
