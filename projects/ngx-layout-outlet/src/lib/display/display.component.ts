import { LayoutService } from '../layout.service';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  TemplateRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'lo-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  @Input()
  in: string;

  @ViewChild('toDisplay', { read: TemplateRef, static: true }) toDisplay: TemplateRef<any>;

  private cleanDisplay?: () => void;

  constructor(
    private layout: LayoutService
  ) { }

  ngOnInit(): void {
    const tpl = this.toDisplay;
    this.cleanDisplay = this.layout.display(this.in, tpl);
  }

  ngOnDestroy(): void {
    if (this.cleanDisplay) {
      this.cleanDisplay();
    }
  }

}
