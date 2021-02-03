import {Sentiment} from './sentiment.model';

export class Analyze {

  constructor(private sentiment: Sentiment) {
  }

  /**
   * Permet de récupérer les données d'un sentiment
   * @param sentiment le sentiment
   */
  getFeeling(sentiment: string) {
    return this.sentiment.getFeeling(sentiment);
  }

}
