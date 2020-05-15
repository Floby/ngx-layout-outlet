import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutOutletDirective } from './layout-outlet.directive';
import {
  EventEmitter,
  Injectable,
  TemplateRef
} from '@angular/core';

type Templates = TemplateRef<any>[];

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private templates: Map<string, Templates> = new Map();
  private tplSubjects: Map<string, BehaviorSubject<Templates>> =  new Map();
  constructor() { }

  onContentChanged = new EventEmitter<string>();

  display(name: string, tpl: TemplateRef<any>): () => void {
    this.addTemplateForName(name, tpl);
    this.onContentChanged.emit(name);

    return () => {
      this.removeTemplateForName(name, tpl);
      this.onContentChanged.emit(name);
    };
  }

  hasContentFor(name: string): Observable<boolean> {
    return this.templatesFor(name).pipe(
      map((templates) => templates.length ? true : false)
    );
  }

  templatesFor(name: string): Observable<Templates> {
    const subject = this.getTemplateSubject(name);
    return subject.asObservable();
  }

  private addTemplateForName(name: string, tpl: TemplateRef<any>) {
    const templatesForName = this.templates.get(name) || [];
    const newTemplates = [...templatesForName, tpl];
    this.templates.set(name, newTemplates);
    this.getTemplateSubject(name).next(newTemplates);
  }

  private removeTemplateForName(name: string, toRemove: TemplateRef<any>) {
    const templatesForName = this.templates.get(name) || [];
    const newTemplates = templatesForName.filter((template) => template !== toRemove);
    this.templates.set(name, newTemplates);
    this.getTemplateSubject(name).next(newTemplates);
  }

  private getTemplateSubject(name: string) {
    if (!this.tplSubjects.has(name)) {
      const subject = new BehaviorSubject<Templates>([]);
      this.tplSubjects.set(name, subject);
    }
    return this.tplSubjects.get(name);
  }
}

