import { Component, Input, OnInit } from '@angular/core';
import { VideosService } from 'src/services/videos.service';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-videocards',
  templateUrl: './videocards.component.html',
  styleUrls: ['./videocards.component.scss'],
})
export class Videocards implements OnInit {
  @Input() videos: [Video];
  constructor(private videoService: VideosService) { }

  ngOnInit() {}

  onRemoveVideo(id) {
    this.videoService.removeVideo(id);
  }

}
