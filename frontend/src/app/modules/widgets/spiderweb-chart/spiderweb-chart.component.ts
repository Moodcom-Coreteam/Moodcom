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
  @Input() withHistory: boolean;

  constructor(public globals: Globals) { }

  ngOnInit(): void {

    const feelingsLabels = this.globals.feelingsLabels;
    const feelings = this.globals.feelings;
    const series = [];

    /**
     * Méthode qui va ajouter les données de chaque vidéos au graphique
     * @param video la vidéo
     * @param hasManyVideos pour savoir si c'est l'analyse d'une seule ou de plusieurs vidéos
     * @param withHistory le paramètre qui indique si l'utilisateur veut afficher l'historique de la dernière analyse
     */
    function addVideoToSerie(video: Video, hasManyVideos: boolean, withHistory: boolean) {
      let index = 0;
      if (hasManyVideos) {
        index = withHistory ? 1 : 0;
      }
      const name = video.title;
      let data = [];
      feelings.forEach( feeling => {
        data.push(video.getFeeling(feeling, index));
      });
      series.push({name, data});
      if (!hasManyVideos && withHistory) {
        data = [];
        feelings.forEach( feeling => {
          data.push(video.getFeeling(feeling, 1));
        });
        series.push({name, data});
      }
    }

    let text;
    // create data for series
    if (this.videos){
      this.videos.forEach( video => {
        addVideoToSerie(video, true , this.withHistory);
      });
      text = this.withHistory ? 'Dernière analyse des sentiments' : 'Analyse des sentiments du jour';
    } else if (this.video){
      addVideoToSerie(this.video, false, this.withHistory);
      text = 'Analyse des sentiments de la vidéo';
    }

    /**
     * On remplit les options du graphique dynamiquement
     */
    this.chartOptions = {
      chart: {
        polar: true,
        type: 'line',
      },
      colors: this.globals.colorsCharts,
      title: {
        text,
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
