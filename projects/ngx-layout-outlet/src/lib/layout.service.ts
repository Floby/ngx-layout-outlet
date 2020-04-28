import { LayoutOutletDirective } from './layout-outlet.directive';
import {
  Injectable,
  TemplateRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private outlets: Map<string, LayoutOutletDirective> = new Map();
  constructor() { }

  display(outletName: string, tpl: TemplateRef<any>) {
    const outlet = this.outlets.get(outletName)
    if (outlet) {
      const detach = outlet.attach(tpl)
      return detach
    }
  }

  registerOutlet(name: string, outlet: LayoutOutletDirective) {
    this.outlets.set(name, outlet)
  }

  unregisterOutlet(outlet: LayoutOutletDirective) {
    const entry = [...this.outlets.entries()]
      .find(([k, v]) => v === outlet)
    if (entry) {
      this.outlets.delete(entry[0])
    }
  }
}
