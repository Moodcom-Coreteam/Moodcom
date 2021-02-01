import {Feelings} from './feelings.model';

export class Analysis {

  constructor(private feelings: Feelings) {
  }

  getFeeling(feelings: string) {
    return this.feelings.getFeeling(feelings);
  }
}