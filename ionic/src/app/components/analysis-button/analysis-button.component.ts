import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Analysis } from 'src/app/models/analysis.model';
import { Feelings } from 'src/app/models/feelings.model';
import { Video } from 'src/app/models/video.model';
import { VideosService } from 'src/services/videos.service';

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
    // récéption des données du back
    // var dataDuBack = [
    //   {
    //     "analyse": {
    //       "sentiment": {
    //         "anger": 0.25,
    //         "fear": 0.2,
    //         "joy": 0.1,
    //         "love": 0.05,
    //         "sadness": 0.3,
    //         "surprise": 0.1
    //       }
    //     }
    //   }
    // /*  ,
    //   {
    //     "analyse": {
    //       "sentiment": {
    //         "anger": 0.1,
    //         "fear": 0.1,
    //         "joy": 0.45,
    //         "love": 0.1,
    //         "sadness": 0.05,
    //         "surprise": 0.2
    //       }
    //     }
    //   },
    //   {
    //     "analyse": {
    //       "sentiment": {
    //         "anger": 0.25,
    //         "fear": 0.25,
    //         "joy": 0.3,
    //         "love": 0.05,
    //         "sadness": 0.05,
    //         "surprise": 0.15
    //       }
    //     }
    //   }*/
    // ];
    // dataDuBack.forEach( (video, index) => {
    //   const pathToSentiment = video['analyse']['sentiment'];
    //   const sentiment = new Sentiment(pathToSentiment['anger'],
    //                                 pathToSentiment['fear'],
    //                                 pathToSentiment['joy'],
    //                                 pathToSentiment['love'],
    //                                 pathToSentiment['sadness'],
    //                                 pathToSentiment['surprise']);
    //   this.videosService.videos[index]['analyze'] = new Analyze(sentiment);
    // });
    // this.router.navigate(['/analyze']);
  }
}
