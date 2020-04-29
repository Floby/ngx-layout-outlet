
import { NgModule } from '@angular/core';
import { DisplayComponent } from './display/display.component';
import { LayoutOutletDirective } from './layout-outlet.directive';
import { ZoneDirective } from './zone.directive';


@NgModule({
  declarations: [DisplayComponent, LayoutOutletDirective, ZoneDirective],
  imports: [
  ],
  exports: [DisplayComponent, LayoutOutletDirective, ZoneDirective]
})
export class NgxLayoutOutletModule { }
