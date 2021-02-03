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

  /**
   * Permet de récupérer l'id d'une vidéo Youtube à partir de son URL
   */
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

  /**
   * Récupère la valeur d'un sentiment d'une analyse donnée
   * @param sentiment le sentiment
   * @param index la position de l'analyse
   */
  getFeeling(sentiment: string, index: number) {
    if (this.analyzes.length > index ) {
      return this.analyzes[index].getFeeling(sentiment);
    }
    return null;
  }
}
