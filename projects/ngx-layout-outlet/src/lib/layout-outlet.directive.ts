import { LayoutService } from './layout.service';
import {
  Attribute,
  Directive,
  OnInit,
  OnDestroy,
  TemplateRef,
  Input,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: 'lo-outlet'
})
export class LayoutOutletDirective implements OnInit, OnDestroy {

  private _name: string;
  private active = false;

  @Input('name')
  set name(next) {
    const previous = this._name;
    this._name = next;
    this.onNamedChanged(previous, next);
  }
  get name() {
    return this._name;
  }

  @Input()
  exclusive = false;


  constructor(
    private location: ViewContainerRef,
    private layout: LayoutService
  ) {
    this.name = name;
  }

  onNamedChanged(previous, next) {
    if (this.active) {
      this.layout.unregisterOutlet(this);
      this.layout.registerOutlet(next, this);
    }
  }

  ngOnInit() {
    const location = this.location;
    this.layout.registerOutlet(this.name, this);
    this.active = true
  }

  ngOnDestroy() {
    this.layout.unregisterOutlet(this);
    this.active = false
  }

  attach(toDisplay: TemplateRef<any>[]) {
    this.detach();
    if (this.exclusive) {
      const lastTemplate = toDisplay[toDisplay.length - 1];
      if (lastTemplate) {
        this.location.createEmbeddedView(lastTemplate)
      }
    } else {
      for (const template of toDisplay) {
        this.location.createEmbeddedView(template);
      }
    }
  }

  detach() {
    this.location.detach();
  }
}
