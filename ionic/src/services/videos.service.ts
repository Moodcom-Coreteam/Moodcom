import { Injectable } from '@angular/core';
import { Video } from '../app/models/video.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Injectable({
    providedIn: 'root'
})

export class VideosService {

    videos: Video[] = [];
    videosSubject = new Subject<Video[]>();

    constructor(private httpClient: HttpClient,
        public datepipe: DatePipe) {
    }

    emitVideos() {
        this.videosSubject.next(this.videos);
    }

    addNewVideo(newVideo: Video) {
        this.videos.push(newVideo);
        this.getYoutubeVideoById(newVideo.idYoutube, newVideo);
        this.emitVideos();
    }

    removeVideo(id: number) {
        this.videos.splice(id, 1);
        this.emitVideos();
    }

    getYoutubeVideoById(idYoutube: string, newVideo: Video) {
        const params = new HttpParams()
            .set('id', idYoutube)
            .set('key', 'AIzaSyC8FpgepgvrNumY-O13ZQokVj0QhQlHye0')
            .set('part', 'snippet');
        this.httpClient
            .get<any[]>('https://www.googleapis.com/youtube/v3/videos', { params })
            .subscribe(
                (response) => {
                    console.log(response);
                    const snippet = response['items'][0]['snippet'];
                    newVideo.title = snippet['title'];
                    newVideo.thumbnail = snippet['thumbnails']['medium']['url'];
                    newVideo.channelTitle = snippet["channelTitle"];
                    newVideo.publishedAt = this.datepipe.transform(Date.parse(snippet["publishedAt"]), 'dd/MM/yyyy');
                });
    }

    clearVideos() {
        this.videos = [];
        this.emitVideos();
    }

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
}
