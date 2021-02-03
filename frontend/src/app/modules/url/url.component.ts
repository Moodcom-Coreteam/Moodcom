import {Component, OnInit} from '@angular/core';
import {Video} from '../../models/video.model';
import {VideosService} from '../../services/videos.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class UrlComponent implements OnInit {

  videoForm: FormGroup;
  error: string;
  isLoading = false;
  filteredSearches: Video[] = [];


  constructor(private formBuilder: FormBuilder,
              private videoService: VideosService,
              private httpClient: HttpClient) {
  }


  ngOnInit(): void {
    this.initForm();
    this.videoService.emitVideos();
  }

  /**
   * PErmet d'initialiser le formulaire (l'URL)
   */
  initForm() {
    this.videoForm = this.formBuilder.group({
      urlVideo: ['', Validators.required]
    });
  }

  /**
   * Méthode qui permet d'ajouter la vidéo Youtube à la liste à partir de son URL.
   * Elle n'est pas ajoutée si elle est déjà présente et une erreur est renvoyée
   */
  addVideo() {
    const videoUrl = this.videoForm.get('urlVideo').value;
    const video = new Video(this.videoService.videos.length, videoUrl);
    if (!this.videoService.issetVideo(video)) {
      this.videoService.addNewVideo(video);
    } else {
      this.error = 'Cette vidéo est déjà présente dans la liste des vidéos à analyser.';
    }
    this.videoForm.reset();
  }

  /**
   * Méthode qui permet de rechercher la liste des vidéos à partir d'un mot clé donné
   * @param value le mot clé
   */
  searchListYoutubeObs(value: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyB8gFmQPNX8VPmTV4tcgKa8kBbkjyvcSo0')
      .set('maxResults', '5')
      .set('type', 'video')
      .set('q', value);
    return this.httpClient
      .get<any[]>('https://youtube.googleapis.com/youtube/v3/search', {params});
  }

  /**
   * Méthode qui va remplir l'autocomplete à partir d'un mot clé donné (sauf si c'est déjà une URL)
   *
   * @param $event l'évemement lors de l'ajout d'une lettre dans l'URL
   */
  onListSearches($event: any) {
    let value = '';
    value += $event.target.value;
    const regexUrl = '((https?):\\/\\/[a-zA-Z0-9\\/:%_+.,#?!@&=-]+)';
    if (value.length >= 3 && !value.match(regexUrl)) {
      this.searchListYoutubeObs(this.videoForm.controls['urlVideo']
        .value).subscribe(
        response => {
          const tmp = [];
          response['items'].forEach(item => {
            function decodeEntities(encodedString) {
              const textArea = document.createElement('textarea');
              textArea.innerHTML = encodedString;
              return textArea.value;
            }

            const video = new Video(this.videoService.videos.length,
              'https://www.youtube.com/watch?v=' + item['id']['videoId']);
            video.title = decodeEntities(item['snippet']['title']);
            video.thumbnail = item['snippet']['thumbnails']['default']['url'];
            tmp.push(video);
          });
          return this.filteredSearches = tmp;
        });
    } else {
      return this.filteredSearches = [];
    }
  }
}
