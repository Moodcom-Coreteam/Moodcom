// Modules anular
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

// Autres modules
import { Video } from '../../../models/video.model';
import { Globals } from '../../../../services/globals';

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

  constructor(public globals: Globals) { }

  ngOnInit(): void {
    console.log("BASIC CHART INIT : " + this.videos);
    //const categories = [];
    //const series = [];



    const feelingsLabels = this.globals.feelingsLabels;
    const feelings = this.globals.feelings;

    const sortedVideos = this.videos.slice().sort(
      (a, b) => {
        const [dayB, monthB, yearB] = b.publishedAt.split('/');
        const [dayA, monthA, yearA] = a.publishedAt.split('/');
        return new Date(monthA + '/' + dayA + '/' + yearA).getTime() - new Date(monthB + '/' + dayB + '/' + yearB).getTime();
      }
    );

    function firstLetterToUppercase(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    feelings.forEach(feeling => {
      window['data' + firstLetterToUppercase(feeling)] = [];
    });

    
    // Création des catégories
    const categories = [];
    sortedVideos.forEach( video => {
      categories.push(video.publishedAt);
      feelings.forEach( feeling => {
        window['data' + firstLetterToUppercase(feeling)].push(video.getFeeling(feeling) * 100);
      });
    });
    

    /**
     * FONCTION DE TEST
     */
    /*sortedVideos.forEach(video => {
      categories.push(video.publishedAt);
      feelings.forEach(feeling => {
        window['data' + firstLetterToUppercase(feeling)].push(video.analysis[feeling] * 100);
      });
    });*/

    // Création des données pour les catégories
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
        marginTop: 50
      },

      title: {
        text: 'Analyse évolutive en fonction de la sortie des vidéos'
      },

      yAxis: {
        title: {
          text: 'Pourcentage de chaque sentiment',
          margin: 50
        }
      },

      xAxis: {
        categories
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
