import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfAnalysisPageRoutingModule } from './self-analysis-routing.module';

import { SelfAnalysisPage } from './self-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfAnalysisPageRoutingModule
  ],
  declarations: [SelfAnalysisPage]
})
export class SelfAnalysisPageModule {}
