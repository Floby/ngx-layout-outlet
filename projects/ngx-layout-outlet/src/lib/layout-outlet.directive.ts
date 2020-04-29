import { LayoutService } from './layout.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { switchMap, distinct, delay } from 'rxjs/operators';
import { ZoneName } from './zone-name';
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
  private templateSubscription: Subscription;
  private outletName = new ReplaySubject<string>(1);

  @Input('name')
  set name(next) {
    if (!next) {
      return;
    }
    const previous = this._name;
    this._name = next;
    this.outletName.next(next);
  }
  get name() {
    return this._name;
  }

  @Input()
  exclusive = false;


  constructor(
    private location: ViewContainerRef,
    private layout: LayoutService,
    private zoneName: ZoneName
  ) {
    this.zoneName.subscribe((name) => this.outletName.next(name));
  }

  ngOnInit() {
    this.templateSubscription = this.outletName.pipe(
      distinct(),
      switchMap((name) => this.layout.templatesFor(name))
    ).subscribe((templates) => {
      this.attach(templates);
    });
    this.active = true;
  }

  ngOnDestroy() {
    if (this.templateSubscription) {
      this.templateSubscription.unsubscribe();
      delete this.templateSubscription;
    }
    this.active = false;
  }

  attach(toDisplay: TemplateRef<any>[]) {
    this.detach();
    if (this.exclusive) {
      const lastTemplate = toDisplay[toDisplay.length - 1];
      if (lastTemplate) {
        this.location.createEmbeddedView(lastTemplate);
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
