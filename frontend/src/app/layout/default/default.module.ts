import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DefaultComponent } from "./default.component";
import { HomePageComponent } from "../../pages/home-page/home-page.component";
import { AnalyzePageComponent } from "../../pages/analyze-page/analyze-page.component";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../../modules/header/header.component";
import { UrlComponent } from "../../modules/url/url.component";
import { SingleVideoComponent } from "../../modules/single-video/single-video.component";
import { VideosComponent } from "../../modules/videos/videos.component";
import { AnalyzeButtonComponent } from "../../modules/analyze-button/analyze-button.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { VideosService } from "../../services/videos.service";
import { MatOptionModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AboutUsPageComponent } from '../../pages/about-us-page/about-us-page.component';
import { MatListModule } from '@angular/material/list';
import { HighchartsChartModule } from 'highcharts-angular';
import { StackedColumnChartComponent } from "../../modules/widgets/stacked-column-chart/stacked-column-chart.component";
import { SpiderwebChartComponent } from "../../modules/widgets/spiderweb-chart/spiderweb-chart.component";
import { Globals } from "../../services/globals";
import { MatTabsModule } from '@angular/material/tabs';
import { BasicLineChartComponent } from "../../modules/widgets/basic-line-chart/basic-line-chart.component";
import { FooterComponent } from '../../modules/footer/footer.component';
import { GoogleLoginProvider, SocialAuthService, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    DefaultComponent,
    HomePageComponent,
    AnalyzePageComponent,
    HeaderComponent,
    FooterComponent,
    UrlComponent,
    DefaultComponent,
    SingleVideoComponent,
    VideosComponent,
    AnalyzeButtonComponent,
    AboutUsPageComponent,
    StackedColumnChartComponent,
    SpiderwebChartComponent,
    BasicLineChartComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexModule,
    RouterModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatListModule,
    HighchartsChartModule,
    MatTabsModule,
    SocialLoginModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DatePipe,
    VideosService,
    Globals,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '228760608715-3r5n8rfjo6ss1g413fe1kosath1eludh.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class DefaultModule {
}
