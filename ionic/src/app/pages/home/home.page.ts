import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api-services.service';
import { VideosService } from 'src/services/videos.service';

import { Video } from '../../models/video.model';
import {Subscription} from 'rxjs';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	title = 'front-end';
	addedVideos;
	videos: Video[];
	videosSubscription: Subscription;
  


	@ViewChild('urlInput', { static: true }) private input: HTMLInputElement;
	constructor(private videoService: VideosService) { }


	ngOnInit() {
		this.videosSubscription = this.videoService.videosSubject.subscribe(
			(videos: Video[]) => {
			  this.videos = videos;
			}
		  );
		  this.videoService.emitVideos();
	}

	ngOnDestroy() {
		this.videosSubscription.unsubscribe();
	  }


	addCard() {
		console.log("salut : " + this.videoService.videos);
		/*const url = this.input['nativeElement'].value;
		const newVid = this.vids.filter((vid) => { return vid.url == url });
		if (newVid.length > 0) {
			this.addedVideos.push(newVid[0]);
		}
		console.log("ADDED VIDS : " + this.addedVideos);
		this.isNotEmpty = true;*/

	}

	removeCard(vidId) {
		console.log("CLOSE");
		let indexToRemove = null;
		this.addedVideos.forEach(video => {
			if (video.id == vidId) {
				indexToRemove = this.addedVideos.indexOf(video);
			}
		});
		this.addedVideos.splice(indexToRemove, 1);
		if (this.addedVideos.length == 0) {
			//this.isNotEmpty = false;
		}
	}



}
