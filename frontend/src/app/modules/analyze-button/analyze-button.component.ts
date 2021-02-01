import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VideosService} from '../../services/videos.service';
import {Video} from '../../models/video.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Sentiment} from '../../models/sentiment.model';
import {Analyze} from '../../models/analyze.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {SharedService} from '../../services/shared.service';
import {History} from '../../models/history.model';
import {Globals} from '../../services/globals';

@Component({
  selector: 'app-analyze-button',
  templateUrl: './analyze-button.component.html',
  styleUrls: ['./analyze-button.component.scss']
})
export class AnalyzeButtonComponent implements OnInit, OnDestroy {

  @Input() videoSize: number;
  videosSubscription: Subscription;
  isLoading = false;
  clickEventsubscription: Subscription;
  user: SocialUser;
  alertVideoTitle: string[];
  indexAlert: number[] = [];

  constructor(private videosService: VideosService,
              private router: Router,
              private httpClient: HttpClient,
              private analyzeService: SharedService,
              private authService: SocialAuthService,
              private global: Globals) {
  }

  ngOnInit(): void {
    this.videosSubscription = this.videosService.videosSubject.subscribe(
      (videos: Video[]) => {
        this.videoSize = videos.length;
      }
    );
    this.videosService.emitVideos();
    this.analyzeService.getReplayAnalyzeEvent().subscribe(() => {
      // on relance pas d'analyse et on la rejoue
      this.router.navigate(['/analyze']);
    });
    this.analyzeService.getCompareAnalyzeEvent().subscribe(() => {
      // on relance une nouvelle analyse
      this.onAnalyzeVideos(true);
    });
    this.authService.authState.subscribe((user) =>
      this.user = user
    );
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
  onAnalyzeVideos(withHistory: boolean) {
    // récupération de l'utilisateur
    const userToken = this.user ? this.user.email : null;
    const body = {user: userToken, videos: this.videosService.videos};
    const url = this.global.getApiUrl();
    const request = this.httpClient.post<any[]>(url + 'api/video', body);

    // Envoie des données au back
    this.isLoading = true;
    request.subscribe(
      data => {
        // récéption des données du back
        data.forEach((video, index) => {
          const pathToSentiment = video['analyses'];

          // Si l'analyse de la vidéo n'est pas nulle (contient des commentaires)
          if (pathToSentiment != null) {
            const sentiment = new Sentiment(pathToSentiment['anger'],
              pathToSentiment['disappointment'],
              pathToSentiment['joy'],
              pathToSentiment['love'],
              pathToSentiment['sadness'],
              pathToSentiment['optimism']);
            this.videosService.videos[index].analyzes.unshift(new Analyze(sentiment));
            this.videosService.videos[index].likes = pathToSentiment['like'];
            this.videosService.videos[index].dislikes = pathToSentiment['dislike'];
            this.videosService.videos[index].comments = pathToSentiment['commentCount'];
          }
          // Si l'analyse de la vidéo est nulle (pas de commentaires)
          else {
            this.videosService.alertVideoTitle.push(this.videosService.videos[index].title);
            this.indexAlert.push(index);
          }
        });

        for (let i = 0; i < this.indexAlert.length; i++) {
          this.videosService.removeVideo(this.indexAlert[i]);
        }
        this.indexAlert = [];

        this.router.navigate(['/analyze']);
        this.isLoading = false;

        // Si on refait une analyse en passant par l'historique
        if (withHistory) {
          this.analyzeService.sendWithHistoryEvent();
          this.analyzeService.showToogleHistory = true;
        }
      }
    );
    // on ajoute la nouvelle analyse à l'historique
    if (this.user != null) {
      const date = new Date();

      const result = this.videosService.dateMyFormat(date);
      this.analyzeService.addNewHistory(new History(result, this.videosService.videos));
    }
  }
}
