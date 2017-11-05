import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2Carousel3dSlideComponent } from './ng2-carousel-3d-slide.component';

describe('Ng2Carousel3dSlideComponent', () => {
  let component: Ng2Carousel3dSlideComponent;
  let fixture: ComponentFixture<Ng2Carousel3dSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2Carousel3dSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2Carousel3dSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
