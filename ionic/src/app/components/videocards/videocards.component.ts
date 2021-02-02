// Modules angular
import { Component, Input, OnInit } from '@angular/core';

// Services
import { VideosService } from 'src/services/videos.service';

// Autres
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

  /**
   * Enlève une vidéo de la liste
   * @param id : id de vidéos
   */
  onRemoveVideo(id) {
    this.videoService.removeVideo(id);
  }

}
