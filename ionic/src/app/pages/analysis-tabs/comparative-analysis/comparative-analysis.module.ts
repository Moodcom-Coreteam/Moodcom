import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparativeAnalysisPageRoutingModule } from './comparative-analysis-routing.module';

import { ComparativeAnalysisPage } from './comparative-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparativeAnalysisPageRoutingModule
  ],
  declarations: [ComparativeAnalysisPage]
})
export class ComparativeAnalysisPageModule {}
