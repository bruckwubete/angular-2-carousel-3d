# ng2-carousel-3d

## Installation

To install this library, run:

```bash
$ npm install ng2-carousel-3d --save
```

## Dependencies

This library needs jquery

import jquery globally as per your type of your project.

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { Ng2Carousel3dModule }  from 'ng2-carousel-3d';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2Carousel3dModule,  // Specify Ng2Carousel3dModule as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<ng2-carousel-3d [slides]="slides" [options]="options" class="col-12" #carousel>
    <ng2-carousel-3d-slide *ngFor="let slide of slides; let i = index" (click)="slideClicked(i)">
        <img class="slide-img" src="{{slide.src}}" alt=""/>
    </ng2-carousel-3d-slide>
</ng2-carousel-3d>
```

```typescript
 // app.component.ts
  @ViewChild('carousel') carousel:any;
  movies : Object[] = []
  slides : Array<Object> = []
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
  constructor(private $movie: MovieService) { //some service  in this case Movie

      $movie.getMovies(1).subscribe(res => {
        this.movies = this.movies.concat(res);
        let newSlides = new Array<object>()

        res.forEach((item) => {
          newSlides.push({src: item['poster_image']})
        })
        this.slides = newSlides.concat(this.slides)
      })

  }

  slideClicked (index) {
    this.carousel.slideClicked(index)
   }
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Bruck Wubete](mailto:bruckwendwessenwubet@cmail.carleton.ca)
