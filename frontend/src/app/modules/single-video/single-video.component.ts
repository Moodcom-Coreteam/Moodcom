import {Component, Input, OnInit} from '@angular/core';
import {VideosService} from '../../services/videos.service';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit {

  @Input() title: string;
  @Input() id: number;
  @Input() thumbnail: string;
  @Input() channelTitle: string;
  @Input() publishedAt: string;

  constructor(private videoService: VideosService) {
  }

  ngOnInit(): void {
  }

  onRemoveVideo() {
    this.videoService.removeVideo(this.id);
  }

}
