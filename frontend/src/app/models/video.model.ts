import {Analyze} from './analyze.model';

export class Video {
  title: string;
  idYoutube: string = null;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
  analyzes: Analyze[] = [];
  likes: number;
  dislikes: number;
  comments: number;

  constructor(public id: number, public url: string) {
    this.idYoutube = this.getIdYoutube();
  }

  getIdYoutube() {
    if (this.idYoutube == null) {
      const idYoutube = this.url.split('v=')[1];
      const ampersandPosition = idYoutube.indexOf('&');
      if (ampersandPosition !== -1) {
        this.idYoutube = idYoutube.substring(0, ampersandPosition);
      } else {
        this.idYoutube = idYoutube;
      }
    }
    return this.idYoutube;
  }

  getFeeling(sentiment: string, index: number) {
    // Retourne le 1er feeling => Cas où y'a pas d'historique
    if (this.analyzes.length > index ) {
      return this.analyzes[index].getFeeling(sentiment);
    }
    return null;
  }
}
