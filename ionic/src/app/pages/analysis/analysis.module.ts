import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalysisPageRoutingModule } from './analysis-routing.module';

import { AnalysisPage } from './analysis.page';

import { BasicLineChartComponent } from '../../components/charts/basic-line-chart/basic-line-chart.component'
import { SpiderwebChartComponent } from '../../components/charts/spiderweb-chart/spiderweb-chart.component'
import { StackedColumnChartComponent } from '../../components/charts/stacked-column-chart/stacked-column-chart.component'
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalysisPageRoutingModule
  ],
  declarations: [
    AnalysisPage, 
    BasicLineChartComponent,
    SpiderwebChartComponent,
    StackedColumnChartComponent

  ],
  exports: [
    HighchartsChartModule,
  ]
})
export class AnalysisPageModule { }
