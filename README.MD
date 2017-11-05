# ng2-carousel-3d

## Installation

To install this library, run:

```bash
$ npm install ng2-carousel-3d --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2-carousel-3d
```

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
