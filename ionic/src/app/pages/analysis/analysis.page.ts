// Modules angular
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { VideosService } from '../../../services/videos.service';

// Autres
import { Video } from '../../models/video.model';
import { Videos } from '../../../../constantes/videos.js'
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss']
})
export class AnalysisPage implements OnInit, OnDestroy {
  testVideos;
  videos: Video[] = [];
  private videosSubscription: Subscription;

  constructor(private router: Router,
    private videosService: VideosService) {
  }

  ngOnInit(): void {
    this.testVideos = Videos;
    console.log("VIDEOS LISTE : " + this.videos);
    
    
    this.videosSubscription = this.videosService.videosSubject.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      }
    );
    this.videosService.emitVideos();
    

  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe();
  }

  /**
   * Si keepVideos = true --> Rajoute une vidéo à l'analyse, sinon relance une nouvelle analyse
   * @param keepVideos : booléen
   */
  onNewAnalyze(keepVideos: boolean) {
    if (!keepVideos) {
      this.videosService.clearVideos();
    }
    this.router.navigate(['']);
  }

}
