import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})

export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text:null, date: null});

  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: '1', text: 'Componentes gerados', date: new Date ('12/26/2017 12:54:23')},
    //   {id: '2', text: 'Bootstrap adicionado', date: new Date ('12/27/2017 9:33:23')},
    //   {id: '3', text: 'Adicionado componente de logs', date: new Date ('12/25/2017 13:28:14')}
    // ]

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a,b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Adicionar em armazenamento local
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // Atualizar armazenamento local
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    });

    // Excluir armazenamento local
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
