import { Component, OnInit } from '@angular/core';

// faz o import do service LogService
import { LogService } from '../../services/log.service';

import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string;
  text: string;
  date: any;

  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    // Inscrever para o selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if(log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    })
  }

  onSubmit() {
    // Checar se há novo log
    if(this.isNew) {
      // Criar novo log
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      // Add log
      this.logService.addLog(newLog);
    } else {
      //  Criar log para ser atualizado
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // update log
      this.logService.updateLog(updLog);
    }

    // Clear state
    this.clearState();
  }

  clearState(){
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }

  generateId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

}
