// Modules angular
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

// Autres
import { Video } from 'src/app/models/video.model';
import { Globals } from 'src/services/globals';


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
    

    /**
     * Fonction de test
     * @param video : video
     */
    /*function addVideoToSerie(video: Video) {
      const name = video.title;
      const data = [];
      feelings.forEach( feeling => {
        data.push(video.analysis[feeling]);
      });
      series.push({name, data});
    }*/

    // Création des données pour les catégories
    if (this.videos){
      this.videos.forEach( video => {
        addVideoToSerie(video);
      });
    } else if (this.video){
      addVideoToSerie(this.video);
    }

    /**
     * Définition des options du chart
     */
    this.chartOptions = {
      chart: {
        polar: true,
        type: 'line',
        marginTop: 50
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
        align: 'left',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        margin: 30,
        // width: '50%'
      },
      series
    };
    HC_exporting(Highcharts);

  }


}
