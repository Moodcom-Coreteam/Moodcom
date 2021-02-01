import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {History} from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private subjectReplayAnalyze = new Subject<any>();
  private subjectCompareAnalyze = new Subject<any>();
  private subjectWithHistory = new Subject<any>();
  private subjectWithoutHistory = new Subject<any>();
  showToogleHistory: boolean = false;
  historySubject = new Subject<History[]>();
  histories: History[] = [];

  /**
   * Méthode qui prévient qu'il faut rejouer une ancienne analyse
   */
  sendReplayAnalyzeEvent() {
    this.subjectReplayAnalyze.next();
  }

  /**
   * Méthode qui permet de réaliser une action à la souscription de celle-ci,
   * dès qu'une analyse doit être rejouée
   */
  getReplayAnalyzeEvent(): Observable<any>{
    return this.subjectReplayAnalyze.asObservable();
  }

  /**
   * Méthode qui prévient qu'il faut rejouer une analyse et en relancer une nouvelle
   */
  sendCompareAnalyzeEvent() {
    this.subjectCompareAnalyze.next();
  }

  /**
   * Méthode qui permet de réaliser une action à la souscription de celle-ci,
   * dès qu'une analyse doit être comparée
   */
  getCompareAnalyzeEvent(): Observable<any>{
    return this.subjectCompareAnalyze.asObservable();
  }

  /**
   * Méthode qui prévient qu'il faut afficher l'historique
   */
  sendWithHistoryEvent() {
    this.subjectWithHistory.next();
  }

  /**
   * Méthode qui permet de réaliser une action à la souscription de celle-ci,
   * dès qu'il faut afficher l'historique
   */
  getWithHistoryEvent(): Observable<any>{
    return this.subjectWithHistory.asObservable();
  }

  /**
   * Méthode qui prévient qu'il faut enlever l'historique
   */
  sendWithoutHistoryEvent() {
    this.subjectWithoutHistory.next();
  }

  /**
   * Méthode qui permet de réaliser une action à la souscription de celle-ci,
   * dès qu'il faut enelever l'historique
   */
  getWithoutHistoryEvent(): Observable<any>{
    return this.subjectWithoutHistory.asObservable();
  }

  /**
   * Emit historique
   */
  emitHistory() {
    this.historySubject.next(this.histories);
  }

  /**
   * Ajoute une nouvelle analyse à l'historique
   * @param newHistory nouvel historique
   */
  addNewHistory(newHistory: History) {
    this.histories.push(newHistory);
    this.emitHistory();
  }

  /**
   * Vide l'historique
   */
  clearHistory() {
    this.histories = [];
    this.emitHistory();
  }


}
