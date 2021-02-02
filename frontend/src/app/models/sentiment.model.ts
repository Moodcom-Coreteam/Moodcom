export class Sentiment {

  constructor(private anger: number,
              private disappointment: number,
              private joy: number,
              private love: number,
              private sadness: number,
              private optimism: number) {}

  /**
   * Permet de récupérer les données d'un sentiment
   * @param sentiment le sentiment
   */
  getFeeling(sentiment: string) {
    return this[sentiment];
  }
}
