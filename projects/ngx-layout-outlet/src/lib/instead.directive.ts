import { Subscription, ReplaySubject } from 'rxjs';
import { tap, delay, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
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
  selector: '[loInstead]',
  providers: [ZoneName]
})
export class InsteadDirective implements OnInit, OnDestroy {
  subscription: Subscription;

  @Input('loInstead')
  set loInstead(name: string) {
    this.zoneName.next(name);
  }


  constructor(
    @Attribute('id') id: string,
    @Attribute('name') name: string,
    private layout: LayoutService,
    private viewContainer: ViewContainerRef,
    private insteadTemplate: TemplateRef<any>,
    private zoneName: ZoneName
  ) {
    this.zoneName.next(id || name);
  }

  ngOnInit() {
    this.subscription = this.zoneName.pipe(
      distinctUntilChanged(),
      switchMap((name) => this.layout.hasContentFor(name)),
    ).subscribe((hasContent) => {
      return hasContent ? this.clearView() : this.displayView();
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private displayView() {
    this.clearView();
    const view = this.viewContainer.createEmbeddedView(this.insteadTemplate);
  }

  private clearView() {
    this.viewContainer.clear();
  }
}
