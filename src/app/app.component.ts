import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { MessageService } from './shared/services/message.service';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  msgs: Message[] = [];
  constructor(private router: Router, private _messageService: MessageService, public _authService: AuthServiceService) { }
  ngOnInit() {
    this._messageService.getMessages()
      .subscribe((value: Object) => {
        this.msgs = [];
        this.msgs.push(value);
      });
  }
  onLogout() {
    this._authService.logOut();
  }
}
