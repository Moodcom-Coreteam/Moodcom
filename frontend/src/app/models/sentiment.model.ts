export class Sentiment {

  constructor(private anger: number,
              private disappointment: number,
              private joy: number,
              private love: number,
              private sadness: number,
              private optimism: number) {}

  getFeeling(sentiment: string) {
    return this[sentiment];
  }
}
