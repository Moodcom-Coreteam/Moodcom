import {Analyze} from "./analyze.model";

export class Video {
  title: string;
  idYoutube: string = null;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
  analyze: Analyze;

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

  getFeeling(sentiment: string) {
    return this.analyze.getFeeling(sentiment);
  }
}
