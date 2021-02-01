import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VideosService} from '../../services/videos.service';
import {Video} from '../../models/video.model';
import {Subscription} from 'rxjs';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import {SharedService} from '../../services/shared.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

more(Highcharts);

@Component({
  selector: 'app-analyze-page',
  templateUrl: './analyze-page.component.html',
  styleUrls: ['./analyze-page.component.scss']
})
export class AnalyzePageComponent implements OnInit, OnDestroy {

  videos: Video[] = [];
  private videosSubscription: Subscription;
  alertVideoTitle: String[] = [];
  withHistory = false;
  showToggleHistory = this.sharedService.showToogleHistory;
  dates: String[] = this.videosService.dates;


  constructor(private router: Router,
              private videosService: VideosService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.videosSubscription = this.videosService.videosSubject.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      }
    );
    this.videosSubscription = this.videosService.alertVideosSubject.subscribe(
      (alertVideoTitle: String[]) => {
        this.alertVideoTitle = alertVideoTitle;
      }
    );
    this.videosService.emitVideos();
    this.videosService.emitAlertVideos();
    if (this.sharedService.showToogleHistory) {
      this.withHistory = true;
    }
  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe();
  }

  /**
   * Méthode qui permet de relancer une analyse en gardant les vidéos ou pas
   * @param keepVideos true si les vidéos sont gardées, false sinon
   */
  onNewAnalyze(keepVideos: boolean) {
    if (!keepVideos) {
      this.videosService.clearVideos();
    }
    this.videosService.clearAlertVideos();
    this.sharedService.showToogleHistory = false;
    this.withHistory = false;
    this.router.navigate(['']);
  }


  /**
   * Méthode qui permet d'afficher ou non l'historique en fonction de l'état du toggle
   */
  onChangeWithHistory({}: MatSlideToggleChange) {
    if (this.sharedService.showToogleHistory) {
      this.withHistory = !this.withHistory;
      if (this.withHistory) {
        this.sharedService.sendWithHistoryEvent();
      } else {
        this.sharedService.sendWithoutHistoryEvent();
      }
    }

  }

}
