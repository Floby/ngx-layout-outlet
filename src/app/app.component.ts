import { Component } from '@angular/core';

@Component({
  selector: 'lo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'layout-outlet';
  color = 'red';

  toggleColor() {
    if (this.color === 'red') {
      this.color = 'blue'
    } else {
      this.color = 'red'
    }
  }
}
