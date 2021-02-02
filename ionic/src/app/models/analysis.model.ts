import {Feelings} from './feelings.model';

export class Analysis {

  constructor(private feelings: Feelings) {
  }

  /**
   * Retourne un sentiment
   * @param feelings : un sentiment
   */
  getFeeling(feelings: string) {
    return this.feelings.getFeeling(feelings);
  }
}