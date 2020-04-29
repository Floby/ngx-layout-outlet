import { Subscription } from 'rxjs';
import { filter, distinct } from 'rxjs/operators'
import { LayoutService } from './layout.service';
import { LayoutOutletDirective } from './layout-outlet.directive';
import {
  Attribute,
  Directive,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  ViewChild,
  Input
} from '@angular/core';

@Directive({
  selector: '[loZone]'
})
export class ZoneDirective implements OnInit, OnDestroy {

  @ViewChild(LayoutOutletDirective)
  outlet: LayoutOutletDirective;

  subscription: Subscription

  @Input('loZone')
  set loZone(name: string) {
    this.name = name
    this.updateView()
  }

  private name: string

  constructor(
    private layout: LayoutService,
    private viewContainer: ViewContainerRef,
    private zoneTemplate: TemplateRef<any>
  ) {
  }

  ngOnInit() {
    this.subscription = this.layout.onContentChanged
      .pipe(filter((name) => name === this.name))
      .pipe(distinct())
      .subscribe((name) => {
        this.updateView()
    })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  private updateView() {
    const name = this.name
    const hasContentToDisplay = this.layout.hasContentFor(this.name)
    this.viewContainer.clear()
    if (this.layout.hasContentFor(this.name)) {
      this.viewContainer.createEmbeddedView(this.zoneTemplate)
    }
  }
}
