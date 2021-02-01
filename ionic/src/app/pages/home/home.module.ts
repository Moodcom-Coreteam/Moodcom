import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
//import { VideosCards } from '../videocards/videocards.component';
import { Searchbar } from '../../components/searchbar/searchbar.component';
import { VideosService } from 'src/services/videos.service';


import {RouterModule} from "@angular/router";

import {HttpClientModule} from "@angular/common/http";
import { DefaultModule } from '../../default.module';
import { Globals } from 'src/services/globals';
import { Videocards } from '../../components/videocards/videocards.component';
import { AnalysisButton } from '../../components/analysis-button/analysis-button.component'


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HomePageRoutingModule,
    DefaultModule,
  ],
  declarations: [
    HomePage,     
    Searchbar,
    Videocards,
    AnalysisButton], 
  providers: [
    VideosService,
    FormBuilder,
    Globals
  ]
})
export class HomePageModule {}
