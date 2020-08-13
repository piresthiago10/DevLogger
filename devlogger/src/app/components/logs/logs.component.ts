import { Component, OnInit } from '@angular/core';

// faz o import do service LogService
import { LogService } from '../../services/log.service';

import { Log } from '../../models/Log';
import { from } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  // instancia o LogService
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.stateClear.subscribe(clear => {
      if(clear) {
        this.selectedLog = {id: '', text: '', date: ''};
      }
    })
    // usa o método getLogs de LogService
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(log: Log){
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if(confirm('Deseja excluir este log?'))
    this.logService.deleteLog(log);
  }

}
