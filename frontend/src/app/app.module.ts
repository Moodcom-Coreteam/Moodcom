//Import modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Import Component
import {AppComponent} from './app.component';
import {DefaultModule} from './layout/default/default.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        DefaultModule
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
