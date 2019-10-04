import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practice';

  constructor() {}

  filterString: string;

  ngOnInit() {
  }

  onInput(str: string) {
    this.filterString = str;
    console.log(this.filterString);
  }
}
