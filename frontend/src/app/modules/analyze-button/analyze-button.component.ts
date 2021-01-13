import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VideosService} from '../../services/videos.service';
import {Video} from "../../models/video.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Sentiment} from "../../models/sentiment.model";
import {Analyze} from "../../models/analyze.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-analyze-button',
  templateUrl: './analyze-button.component.html',
  styleUrls: ['./analyze-button.component.scss']
})
export class AnalyzeButtonComponent implements OnInit, OnDestroy {

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
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    // Envoie des données au back
    this.isLoading = true;
    this.httpClient.post<any[]>('http://localhost:8080/video', this.videosService.videos).subscribe(
      async data => {
        // récéption des données du back
        data.forEach( (video, index) => {
          const pathToSentiment = video['analyses'];
          const sentiment = new Sentiment(pathToSentiment['anger'],
            pathToSentiment['fear'],
            pathToSentiment['joy'],
            pathToSentiment['love'],
            pathToSentiment['sadness'],
            pathToSentiment['surprise']);
          this.videosService.videos[index]['analyze'] = new Analyze(sentiment);
        });
        await delay(2000);
        this.router.navigate(['/analyze']);
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
