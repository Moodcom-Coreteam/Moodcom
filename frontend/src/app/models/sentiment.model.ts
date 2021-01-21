export class Sentiment {

  constructor(private anger: number,
              private fear: number,
              private joy: number,
              private love: number,
              private sadness: number,
              private surprise: number) {}

  getFeeling(sentiment: string) {
    return this[sentiment];
  }
}
