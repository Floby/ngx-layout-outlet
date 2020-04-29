import { Subscription, ReplaySubject } from 'rxjs';
import { delay, switchMap, filter, distinct } from 'rxjs/operators';
import { LayoutService } from './layout.service';
import { LayoutOutletDirective } from './layout-outlet.directive';
import { ZoneName } from './zone-name';
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
  selector: '[loZone]',
  providers: [ZoneName]
})
export class ZoneDirective implements OnInit, OnDestroy {

  subscription: Subscription;

  @Input('loZone')
  set loZone(name: string) {
    this.zoneName.next(name);
  }


  constructor(
    @Attribute('id') id: string,
    @Attribute('name') name: string,
    private layout: LayoutService,
    private viewContainer: ViewContainerRef,
    private zoneTemplate: TemplateRef<any>,
    private zoneName: ZoneName,
  ) {
    this.zoneName.next(id || name);
  }

  ngOnInit() {
    this.subscription = this.zoneName.pipe(
      distinct(),
      switchMap((name) => this.layout.hasContentFor(name)),
      delay(0) // Necessary for child outlet to trigger
    ).subscribe((hasContent) => {
      hasContent ? this.displayView() : this.clearView();
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private displayView() {
    this.clearView();
    const view = this.viewContainer.createEmbeddedView(this.zoneTemplate);
  }

  private clearView() {
    this.viewContainer.clear();
  }
}
