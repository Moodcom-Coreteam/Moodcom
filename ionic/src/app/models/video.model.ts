import {Analysis} from "./analysis.model";

/**
 * Définition du modèle de vidéo
 */
export class Video {
  title: string;
  idYoutube: string = null;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
  analysis: Analysis;

  constructor(public id: number, public url: string) {
    this.idYoutube = this.getIdYoutube();
  }

  /**
   * Fonction de split de l'url pour trouver l'id de la vidéo
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
   * Récupère un sentiment
   * @param feelings : un sentiment
   */
  getFeeling(feelings: string) {
    return this.analysis.getFeeling(feelings);
  }
}
