import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {VideosService} from '../../services/videos.service';
import {Video} from '../../models/video.model';
import {SharedService} from '../../services/shared.service';
import {History} from '../../models/history.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sentiment} from '../../models/sentiment.model';
import {Analyze} from '../../models/analyze.model';
import {Subscription} from 'rxjs';
import {Globals} from '../../services/globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {

  user: SocialUser;
  lightMode = false;
  histories: History[] = [];
  historySubscription: Subscription;
  authSubscription: Subscription;

  @Output()
  readonly lightModeSwitched = new EventEmitter<boolean>();

  constructor(private authService: SocialAuthService,
              private videosService: VideosService,
              private analyzeService: SharedService,
              private httpClient: HttpClient,
              private global: Globals) {
  }

  ngOnDestroy(): void {
    this.historySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.lightModeSwitched.emit(false);

    this.historySubscription = this.analyzeService.historySubject.subscribe(
      (history: History[]) => {
        this.histories = history;
      }
    );
    this.analyzeService.emitHistory();
  }

  /**
   * Change le thème de l'application
   * @param checked si il est true, le thème sombre est activé, sinon le thème clair
   */
  onDarkModeSwitched({checked}: MatSlideToggleChange) {
    this.lightMode = !this.lightMode;
    this.lightModeSwitched.emit(checked);
  }

  /**
   * Méthode qui connecte l'utilisateur avec Google
   */
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authSubscription = this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user != null) {
        this.getHistoriesOfUser();
      }
    });
  }

  /**
   * Méthode qui déconnecte l'utilisateur
   */
  signOut(): void {
    this.authSubscription.unsubscribe();
    this.histories = [];
    this.analyzeService.clearHistory();
    this.authService.signOut();
    this.user = null;
  }

  /**
   * Méthode qui vie le tableau des alertes pour les vidéos n'ayant pas de commentaires
   */
  clearAlert() {
    this.videosService.clearAlertVideos();
    this.analyzeService.showToogleHistory = false;
  }


  /**
   * Méthode qui rejoue un historique sans relancer d'analyse
   * @param history l'historique
   */
  replayAnalyze(history: History) {
    this.updateVideosFromHistory(history);
    this.analyzeService.sendReplayAnalyzeEvent();
  }

  /**
   * Méthode qui rejoue un historique, et recrée une nouvelle analyse de ses vidéos
   * @param history l'historique à rejouer
   */
  compareAnalyze(history: History) {
    this.updateVideosFromHistory(history);
    this.analyzeService.sendCompareAnalyzeEvent();
    this.analyzeService.showToogleHistory = true;
  }

  /**
   * Méthode qui remplace les vidéos à analyser par celle de l'historique
   * @param history l'historique
   */
  private updateVideosFromHistory(history: History) {
    this.videosService.clearVideos();
    this.videosService.clearAlertVideos();
    history.videos.forEach(video => {
      this.videosService.addNewVideoFromHistory(video, history.date);
    });
  }

  /**
   * Méthode qui demande et receptionne les derniers historiques d'un utilisateur
   */
  private getHistoriesOfUser() {
    this.histories = [];
    this.analyzeService.clearHistory();
    let index = 0;

    // récupération des données du back

    const userToken = this.user ? this.user.email : null;
    const url = this.global.getApiUrl();
    const request = this.httpClient.get<any[]>(url + '/api/history/' + userToken);

    // Remplissage des historiques avec les données du back
    request.subscribe(data => {
      for (const history in data) {
        index++;
        if (index <= 5) {
          const date = data[history]['date'];
          const videosFromBack = data[history]['videos'];
          const videos = [];
          for (const v in videosFromBack) {
            const video = new Video(videos.length, videosFromBack[v]['url']);
            video.channelTitle = videosFromBack[v]['channel'];
            video.description = videosFromBack[v]['description'];
            video.title = videosFromBack[v]['title'];
            video.publishedAt = videosFromBack[v]['publishedAt'];
            const pathToSentiment = videosFromBack[v]['analyse'];
            const sentiment = new Sentiment(pathToSentiment['anger'],
              pathToSentiment['disappointment'],
              pathToSentiment['joy'],
              pathToSentiment['love'],
              pathToSentiment['sadness'],
              pathToSentiment['optimism']);
            const analyse = new Analyze(sentiment);
            video.analyzes.push(analyse);
            video.likes = pathToSentiment['like'];
            video.dislikes = pathToSentiment['dislike'];
            video.comments = pathToSentiment['commentCount'];
            videos.push(video);
          }
          this.analyzeService.addNewHistory(new History(date, videos), true);
        }
      }
    });
  }

}
