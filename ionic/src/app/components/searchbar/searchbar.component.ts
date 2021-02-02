// Modules angular
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// Services
import { VideosService } from 'src/services/videos.service';

// Autres
//import { videos } from '../../../../constantes/videos'
import { Video } from '../../models/video.model';


@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss'],
})
export class Searchbar implements OnInit {
	videoForm: FormGroup;
	error: string;
	isLoading = false;
	filteredSearches: Video[] = [];

	@Input() addCardFunction: () => void;

	@ViewChild('urlInput', { static: true }) private input: HTMLInputElement;

	constructor(private formBuilder: FormBuilder,
		private videoService: VideosService,
		private httpClient: HttpClient) { }

	ngOnInit() {
		this.initForm();
		this.videoService.emitVideos();
	}

	/**
	 * Rajoute une card (old)
	 */
	addCard() {
		this.addCardFunction();
	}

	/**
	 * Init du formulaire
	 */
	initForm() {
		this.videoForm = this.formBuilder.group({
			urlVideo: ['', Validators.required]
		});
	}

	/**
	 * Rajoute une vidéo dans la liste des vidéos choisies
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

	// API YOUTUBE
	/**
	 * Fais appel à l'API Youtube 
	 * @param value : url
	 */
	searchListYoutubeObs(value: string): Observable<any> {
		const params = new HttpParams()
			.set('part', 'snippet')
			.set('key', 'AIzaSyB8gFmQPNX8VPmTV4tcgKa8kBbkjyvcSo0')
			.set('maxResults', '5')
			.set('type', 'video')
			.set('q', value);
		return this.httpClient
			.get<any[]>('https://youtube.googleapis.com/youtube/v3/search', { params });
	}

	/**
	 * Fonction lancée lors de la saisie de l'url, va gérer la fonction d'appel de l'API Youtube
	 * @param $event : event de saisiz
	 */
	onListSearches($event: any) {
		let value = '';
		value += $event.target.value;
		const url = this.input['nativeElement'].value;
		const regexUrl = '((https?):\\/\\/[a-zA-Z0-9\\/:%_+.,#?!@&=-]+)';
		if (value.length >= 3 && !value.match(regexUrl)) {
			this.searchListYoutubeObs(url)
				.subscribe(
					response => {
						const tmp = [];
						response['items'].forEach(item => {
							function decodeEntities(encodedString) {
								const textArea = document.createElement('textarea');
								textArea.innerHTML = encodedString;
								return textArea.value;
							}

							const video = new Video(this.videoService.videos.length,
								"https://www.youtube.com/watch?v=" + item['id']['videoId']);
							video.title = decodeEntities(item['snippet']['title']);
							video.thumbnail = item['snippet']['thumbnails']['default']['url'];
							tmp.push(video);
						});
						return this.filteredSearches = tmp;
					});
		} else {
			return this.filteredSearches = [];
		}
		console.log("FILTERED SEARCHES : " + this.filteredSearches);
	}

}
