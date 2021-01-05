import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './layout/default/default.component';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AnalyzePageComponent} from "./pages/analyze-page/analyze-page.component";
import {AboutUsPageComponent} from './pages/about-us-page/about-us-page.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: HomePageComponent
  }, {
    path: 'analyze',
    component: AnalyzePageComponent
  }, {
    path: 'aboutUs',
    component: AboutUsPageComponent
  }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
