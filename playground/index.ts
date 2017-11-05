/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Ng2Carousel3dModule }  from 'ng2-carousel-3d';

@Component({
  selector: 'app',
  template: ` <ng2-carousel-3d [slides]="slides" [options]="options" class="col-12" #carousel>
                <ng2-carousel-3d-slide *ngFor="let slide of slides; let i = index" (click)="slideClicked(i)">
                    <img class="slide-img" src="{{slide.src}}" alt=""/>
                </ng2-carousel-3d-slide>
              </ng2-carousel-3d>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, Ng2Carousel3dModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
