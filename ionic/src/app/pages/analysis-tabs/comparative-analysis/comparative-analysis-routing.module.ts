import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparativeAnalysisPage } from './comparative-analysis.page';

const routes: Routes = [
  {
    path: '',
    component: ComparativeAnalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparativeAnalysisPageRoutingModule {}
