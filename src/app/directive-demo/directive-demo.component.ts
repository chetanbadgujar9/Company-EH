import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-directive-demo',
  templateUrl: './directive-demo.component.html',
  styleUrls: ['./directive-demo.component.css']
})
export class DirectiveDemoComponent implements OnInit {
  username: any = 'Eternus@gmail.com';
  Name: any;
  mobPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  showElem: boolean = false;
  Mobile: any;
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this._http.get('https://api.myjson.com/bins/7xq2x').subscribe(() => {
      console.log('Http Call is success from compoennt');
    }, (error) => {
      console.log('Http Call is failed from component');
    });
  }
  onBlur() {
    console.log(this.username);
  }
  onClick() {
    alert(this.Name);
  }
  onHiddenClick() {
    if (this.showElem) {
      this.showElem = false;
    } else {
      this.showElem = true;
    }
  }
}
