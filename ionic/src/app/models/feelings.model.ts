export class Feelings {

  /**
   * Définition des sentiments
   * @param anger : colère
   * @param disappointment : déception 
   * @param joy : joie
   * @param love : amour
   * @param sadness : tristesse
   * @param optimism : optimisme
   */
  constructor(private anger: number,
    private disappointment: number,
    private joy: number,
    private love: number,
    private sadness: number,
    private optimism: number) { }

  /**
   * Retourne un sentiment donné
   */
  getFeeling(feelings: string) {
    return this[feelings];
  }
}