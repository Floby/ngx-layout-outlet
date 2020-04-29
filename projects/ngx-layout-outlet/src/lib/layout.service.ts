import { LayoutOutletDirective } from './layout-outlet.directive';
import {
  EventEmitter,
  Injectable,
  TemplateRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private outlets: Map<string, LayoutOutletDirective> = new Map();
  private templates: Map<string, TemplateRef<any>[]> = new Map();
  constructor() { }

  onContentChanged = new EventEmitter<string>()

  display(name: string, tpl: TemplateRef<any>): () => void {
    this.addTemplateForName(name, tpl)
    this.updateForName(name)
    this.onContentChanged.emit(name)
    return () => {
      this.removeTemplateForName(name, tpl)
      this.updateForName(name)
      this.onContentChanged.emit(name)
    }
  }

  hasContentFor(name: string): boolean {
    const templatesForName = this.templates.get(name) || []
    return templatesForName.length > 0
  }

  private updateForName(name: string) {
    const outlet = this.outlets.get(name)
    const templates = this.templates.get(name) || []
    if (outlet) {
      outlet.attach(templates)
    }
  }

  private addTemplateForName(name: string, tpl: TemplateRef<any>) {
    const templatesForName = this.templates.get(name) || []
    templatesForName.push(tpl)
    const newTemplates = [...templatesForName, tpl]
    this.templates.set(name, newTemplates)
  }

  private removeTemplateForName(name: string, toRemove: TemplateRef<any>) {
    const templatesForName = this.templates.get(name) || []
    const newTemplates = templatesForName.filter((template) => template !== toRemove)
    this.templates.set(name, newTemplates)
  }

  registerOutlet(name: string, outlet: LayoutOutletDirective) {
    this.outlets.set(name, outlet)
    this.updateForName(name)
  }

  unregisterOutlet(outlet: LayoutOutletDirective) {
    const entry = [...this.outlets.entries()]
      .find(([k, v]) => v === outlet)
    if (entry) {
      this.outlets.delete(entry[0])
    }
  }
}
