import { LayoutService } from './layout.service';
import {
  Attribute,
  Directive,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: 'lo-outlet'
})
export class LayoutOutletDirective implements OnInit, OnDestroy {

  constructor(
    @Attribute('name') private name: string,
    private location: ViewContainerRef,
    private layout: LayoutService
  ) { }

  ngOnInit() {
    const location = this.location
    this.layout.registerOutlet(this.name, this)
  }

  ngOnDestroy() {
    this.layout.unregisterOutlet(this)
  }

  attach(toDisplay: TemplateRef<any>) {
    this.location.createEmbeddedView(toDisplay)
  }

}
