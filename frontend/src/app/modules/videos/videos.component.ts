import {Component, OnDestroy, OnInit} from '@angular/core';
import {Video} from '../../models/video.model';
import {VideosService} from '../../services/videos.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {

  videos: Video[];
  videosSubscription: Subscription;


  constructor(private videoService: VideosService) {
  }

  ngOnInit(): void {
    this.videosSubscription = this.videoService.videosSubject.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      }
    );
    this.videoService.emitVideos();
  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe();
  }

}
