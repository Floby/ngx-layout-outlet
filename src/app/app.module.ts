import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './page/index/index.component';
import { ListComponent } from './page/list/list.component';
import { DetailComponent } from './page/list/detail/detail.component';
import { NgxLayoutOutletModule } from 'ngx-layout-outlet';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLayoutOutletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
