import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisPage } from '../analysis/analysis.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: '',
    //redirectTo: '/home/tab1',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'analysis',
    component: AnalysisPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
