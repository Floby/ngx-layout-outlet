
import { NgModule } from '@angular/core';
import { DisplayComponent } from './display/display.component';
import { LayoutOutletDirective } from './layout-outlet.directive';
import { ZoneDirective } from './zone.directive';
import { InsteadDirective } from './instead.directive';


@NgModule({
  declarations: [DisplayComponent, LayoutOutletDirective, ZoneDirective, InsteadDirective],
  imports: [
  ],
  exports: [DisplayComponent, LayoutOutletDirective, ZoneDirective, InsteadDirective]
})
export class NgxLayoutOutletModule { }
