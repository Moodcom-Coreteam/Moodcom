import {Injectable} from '@angular/core';
import {Video} from '../models/video.model';
import {Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DatePipe} from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class VideosService {

  videos: Video[] = [];
  videosSubject = new Subject<Video[]>();
  alertVideoTitle: String[] = [];
  alertVideosSubject = new Subject<String[]>();
  dates: String[] = [];
  datesSubject = new Subject<String[]>();

  constructor(private httpClient: HttpClient,
              public datepipe: DatePipe) {
  }

  emitVideos() {
    this.videosSubject.next(this.videos);
  }

  /**
   * Ajouter des vidéos à partir d'une analyse de l'historique
   * @param newVideo La vidéo à ajouter
   * @param date la date de l'analyse
   */
  addNewVideoFromHistory(newVideo: Video, date: String) {
    this.videos.push(newVideo);
    this.dates.push(date);
    // Date d'aujourd'hui lorsque que l'on fait la comparaison
    const nowDate = new Date();
    this.dates.push(this.dateMyFormat(nowDate));
    this.getYoutubeVideoById(newVideo.idYoutube, newVideo);
    this.emitVideos();
    this.emitDates();
  }

  /**
   * Méthode qui permet de formatter la date
   * @param date la date à formatter
   */
  dateMyFormat(date: Date) {
    var dateDay = date.getDate().toString();
    var dateMonth = (date.getMonth() + 1).toString();
    var dateMinutes = (date.getMinutes()).toString();
    if (dateDay.length == 1) {
      dateDay = '0' + dateDay;
    }
    if (dateMonth.length == 1) {
      dateMonth = '0' + dateMonth;
    }
    if (dateMinutes.length == 1) {
      dateMinutes = '0' + dateMinutes;
    }
    return dateDay + '/' + dateMonth + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + dateMinutes;
  }

  /**
   * Méthode qui permet l'ajout d'une vidéo
   * @param newVideo la vidéo à ajouter
   */
  addNewVideo(newVideo: Video) {
    this.videos.push(newVideo);
    this.getYoutubeVideoById(newVideo.idYoutube, newVideo);
    this.emitVideos();
    this.emitDates();
  }

  /**
   * Méthode qui supprime une vidéo
   * @param id l'identifiant de la vidéo à supprimer
   */
  removeVideo(id: number) {
    this.videos.splice(id, 1);
    this.emitVideos();
  }

  /**
   * Méthode qui permet de récupérer une vidéo à travers l'API Youtube
   * @param idYoutube l'identifiant de la vidéo Youtube à récupérer
   * @param newVideo la nouvelle vidéo récupérée
   */
  getYoutubeVideoById(idYoutube: string, newVideo: Video) {
    const params = new HttpParams()
      .set('id', idYoutube)
      .set('key', 'AIzaSyAKXI0iS8OJco-eBu8krefnO2qVXD0qaFc')
      .set('part', 'snippet, statistics');
    this.httpClient
      .get<any[]>('https://www.googleapis.com/youtube/v3/videos', {params})
      .subscribe(
        (response) => {
          const snippet = response['items'][0]['snippet'];
          const statistics = response['items'][0]['statistics'];
          newVideo.title = snippet['title'];
          newVideo.thumbnail = snippet['thumbnails']['medium']['url'];
          newVideo.channelTitle = snippet['channelTitle'];
          newVideo.description = snippet['description'];
          newVideo.likes = statistics['likeCount'];
          newVideo.dislikes = statistics['dislikeCount'];
          newVideo.comments = statistics['commentCount'];
          newVideo.publishedAt = this.datepipe.transform(Date.parse(snippet['publishedAt']), 'dd/MM/yyyy');
        });
  }

  /**
   * Méthode qui vide le tableau des vidéos de l'analyse
   */
  clearVideos() {
    this.videos = [];
    this.emitVideos();
  }

  /**
   * Permet de vérifier si une vidéo est présente dans la liste
   * @param video la vidéo à vérifier
   */
  issetVideo(video: Video) {
    const idYoutube = video.getIdYoutube();
    let same = false;
    this.videos.forEach(v => {
      if (v.getIdYoutube() === idYoutube) {
        same = true;
      }
    });
    return same;
  }

  /**
   * Emit les alertes
   */
  emitAlertVideos() {
    this.alertVideosSubject.next(this.alertVideoTitle);
  }

  /**
   * Méthode qui vide le tableau des vidéos sans commentaires dans l'analyse
   */
  clearAlertVideos() {
    this.alertVideoTitle = [];
    this.emitAlertVideos();
  }

  /**
   * Emit les dates
   */
  emitDates() {
    this.datesSubject.next(this.dates);
  }
}
