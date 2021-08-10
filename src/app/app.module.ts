import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { JokeItemComponent } from './components/joke-item/joke-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CategoryTransformPipe} from "./pipes/category-transform.pipe";

@NgModule({
  declarations: [
    AppComponent,
    JokeListComponent,
    JokeItemComponent,
    CategoryTransformPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
