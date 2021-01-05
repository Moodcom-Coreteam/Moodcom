import {Sentiment} from './sentiment.model';

export class Analyze {

  constructor(private sentiment: Sentiment) {
  }

  getFeeling(sentiment: string) {
    return this.sentiment.getFeeling(sentiment);
  }
}
