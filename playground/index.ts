/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Ng2Carousel3dModule }  from '../src/index';

@Component({
  selector: 'app',
  template: ` <ng2-carousel-3d [slides]="slides" [options]="options" class="col-12" #carousel>
                <ng2-carousel-3d-slide *ngFor="let slide of slides; let i = index" (click)="slideClicked(i)">
                    <img class="slide-img" src="{{slide.src}}" alt=""/>
                </ng2-carousel-3d-slide>
              </ng2-carousel-3d>`
})
export class AppComponent {
  slides : Array<Object> = [{'src': '/assets/img/blur-bg-blurred.jpg'},{'src': '/assets/img/blur-bg-blurred.jpg'},{'src': '/assets/img/blur-bg-blurred.jpg'},{'src': '/assets/img/blur-bg-blurred.jpg'},{'src': '/assets/img/blur-bg-blurred.jpg'},{'src': '/assets/img/blur-bg-blurred.jpg'},{'src': '/assets/img/blur-bg-blurred.jpg'}]
  options : Object = {
    clicking: true,
    sourceProp: 'src',
    visible: 7,
    perspective: 1,
    startSlide: 0,
    border: 3,
    dir: 'ltr',
    width: 360,
    height: 270,
    space: 220,
    autoRotationSpeed: 5000,
    loop: true
}
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, Ng2Carousel3dModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
