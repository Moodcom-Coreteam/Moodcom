// Modules angular
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { VideosService } from 'src/services/videos.service';

// Autres
import { Analysis } from 'src/app/models/analysis.model';
import { Feelings } from 'src/app/models/feelings.model';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-analysis-button',
  templateUrl: './analysis-button.component.html',
  styleUrls: ['./analysis-button.component.scss'],
})
export class AnalysisButton implements OnInit, OnDestroy {

  @Input() videoSize: number;
  videosSubscription: Subscription;
  isLoading = false;

  constructor(private videosService: VideosService,
    private router: Router,
    private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.videosSubscription = this.videosService.videosSubject.subscribe(
      (videos: Video[]) => {
        this.videoSize = videos.length;
      }
    );
    this.videosService.emitVideos();
  }

  test() {
    console.log("BUTTON PUSHED");
    
  }
  
  /**
   * Permet d'afficher le texte du bouton en fonction du nombre de vidéos
   */
  text() {
    switch (this.videoSize) {
      case 1:
        return 'Analyser la vidéo';
      default:
        return 'Analyser les ' + this.videoSize + ' vidéos';
    }
  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe();
  }


  /**
   * Permet de lancer une nouvelle analyse et récupérer de la récupérer
   */
  onAnalyzeVideos() {
    // Envoie des données au back
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Envoie des données au back
    this.isLoading = true;
    console.log(this.videosService.videos);
    const body = {user: null, videos: this.videosService.videos};
    
    this.httpClient.post<any[]>('http://localhost:8080/api/video', body).subscribe(
      async data => {
        // récéption des données du back
        data.forEach((video, index) => {
          const pathToFeelings = video['analyses'];
          const feelings = new Feelings(pathToFeelings['anger'],
            pathToFeelings['disappointment'],
            pathToFeelings['joy'],
            pathToFeelings['love'],
            pathToFeelings['sadness'],
            pathToFeelings['optimism']);
          this.videosService.videos[index]['analysis'] = new Analysis(feelings);
        });
        await delay(2000);
        this.router.navigate(['/analysis']);
        this.isLoading = false;
      }
    );
  }
}
