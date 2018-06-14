import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormizableModule } from 'formizable';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormizableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
