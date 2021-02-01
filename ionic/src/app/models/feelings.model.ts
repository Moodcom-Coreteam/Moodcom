export class Feelings {

    constructor(private anger: number,
                private disappointment: number,
                private joy: number,
                private love: number,
                private sadness: number,
                private optimism: number) {}
  
    getFeeling(feelings: string) {
      return this[feelings];
    }
  }