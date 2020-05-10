import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryService } from './services/in-memory.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryService,  { dataEncapsulation: false }),
    FontAwesomeModule
  ],
  exports:[
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ]
})
export class CoreModule { 
}
