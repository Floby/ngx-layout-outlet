import { ReplaySubject } from 'rxjs'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoneName extends ReplaySubject<string> {
  constructor() {
    super(1)
  }
}
