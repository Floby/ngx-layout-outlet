import { LayoutService } from '../layout.service'
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'lo-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input()
  in: string;

  @ViewChild('toDisplay', { read: TemplateRef, static: true }) toDisplay: TemplateRef<any>;

  constructor(
    private layout: LayoutService
  ) { }

  ngOnInit(): void {
    const tpl = this.toDisplay
    this.layout.display(this.in, tpl)
  }

}
