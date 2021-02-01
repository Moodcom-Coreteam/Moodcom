import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysisPage } from './analysis.page';

const routes: Routes = [
  {
    path: 'analysis',
    component: AnalysisPage,
    children: [
      {
        path: 'comparative',
        loadChildren: () => import('../analysis-tabs/comparative-analysis/comparative-analysis.module').then( m => m.ComparativeAnalysisPageModule)
      },
      {
        path: 'evolutive',
        loadChildren: () => import('../analysis-tabs/evolutive-analysis/evolutive-analysis.module').then( m => m.EvolutiveAnalysisPageModule)
      },
      {
        path: 'self',
        loadChildren: () => import('../analysis-tabs/self-analysis/self-analysis.module').then( m => m.SelfAnalysisPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisPageRoutingModule {}
