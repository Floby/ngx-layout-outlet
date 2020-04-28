import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { ListComponent } from './page/list/list.component';
import { DetailComponent } from './page/list/detail/detail.component';



const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: IndexComponent
}, {
  path: 'list',
  component: ListComponent,
  children: [{
    path: 'detail',
    component: DetailComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
