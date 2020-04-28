
import { NgModule } from '@angular/core';
import { DisplayComponent } from './display/display.component';
import { LayoutOutletDirective } from './layout-outlet.directive';


@NgModule({
  declarations: [DisplayComponent, LayoutOutletDirective],
  imports: [
  ],
  exports: [DisplayComponent, LayoutOutletDirective]
})
export class NgxLayoutOutletModule { }
