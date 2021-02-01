import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvolutiveAnalysisPageRoutingModule } from './evolutive-analysis-routing.module';

import { EvolutiveAnalysisPage } from './evolutive-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvolutiveAnalysisPageRoutingModule
  ],
  declarations: [EvolutiveAnalysisPage]
})
export class EvolutiveAnalysisPageModule {}
