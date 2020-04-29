import { Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'layout-outlet';
  color = 'red';
  aside = false;
  hasLeftContent = false;

  constructor(
  ) {
  }
  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toggleColor() {
    if (this.color === 'red') {
      this.color = 'blue';
    } else {
      this.color = 'red';
    }
  }
}
