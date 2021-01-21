import{Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VideosService} from '../../services/videos.service';
import {Video} from '../../models/video.model';
import {Subscription} from 'rxjs';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);

@Component({
  selector: 'app-analyze-page',
  templateUrl: './analyze-page.component.html',
  styleUrls: ['./analyze-page.component.scss']
})
export class AnalyzePageComponent implements OnInit, OnDestroy {

  videos: Video[] = [];
  private videosSubscription: Subscription;

  constructor(private router: Router,
              private videosService: VideosService) {
  }

  ngOnInit(): void {
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

  onNewAnalyze(keepVideos: boolean) {
    if (!keepVideos) {
      this.videosService.clearVideos();
    }
    this.router.navigate(['']);
  }

}
