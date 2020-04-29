import { Observable } from 'rxjs'
import { delay, filter, map } from 'rxjs/operators'
import { LayoutService } from 'ngx-layout-outlet';
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
  hasLeftContent = false

  constructor(
    private layout: LayoutService
  ) {
    this.layout.templatesFor('left')
      .subscribe((templates) => {
        console.log('APP left', templates)
      })
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
