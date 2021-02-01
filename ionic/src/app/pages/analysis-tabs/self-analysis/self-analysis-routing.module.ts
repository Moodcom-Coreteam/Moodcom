import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfAnalysisPage } from './self-analysis.page';

const routes: Routes = [
  {
    path: '',
    component: SelfAnalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfAnalysisPageRoutingModule {}
