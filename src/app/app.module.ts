import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { JokeItemComponent } from './components/joke-item/joke-item.component';

@NgModule({
  declarations: [
    AppComponent,
    JokeListComponent,
    JokeItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
