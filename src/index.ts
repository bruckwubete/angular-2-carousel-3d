import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2Carousel3dComponent } from './ng2-carousel-3d.component';
import { Ng2Carousel3dSlideComponent } from './ng2-carousel-3d-slide.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Ng2Carousel3dComponent,
    Ng2Carousel3dSlideComponent
  ],
  exports: [
    Ng2Carousel3dComponent,
    Ng2Carousel3dSlideComponent
  ]
})
export class Ng2Carousel3dModule {
}
