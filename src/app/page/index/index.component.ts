import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'lo-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  seconds = 0;
  interval = null;
  constructor() { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
