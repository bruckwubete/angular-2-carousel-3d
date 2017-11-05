import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { Ng2Carousel3dService }  from './ng2-carousel-3d.service';
import $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'ng2-carousel-3d',
  templateUrl: './ng2-carousel-3d.component.html',
  styleUrls: ['./ng2-carousel-3d.component.scss'],
  providers: []
})
export class Ng2Carousel3dComponent implements OnInit, OnDestroy {
    @Input() options:Object
    @Input() slides:Array<Object>
    @Input() onBeforeChange:Function
    @Input() onLastSlide:Function
    @Input() onSlideChange:Function
    @Input() onSelectedClick: Function


    public isLoading = true;
    public isSuccessful = false;
    public isRendered = false;
    public percentLoaded = 0;
    private percentSubscription : any
    private imageLocationSubscription : any;
    private autoRotation = null;
    private carousel3d:any
    public controls:any
    private $wrapper = null
    private $slides = []
    private $carouselService:any
    private $timer:any
    private autoRotationLocked:boolean
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.percentSubscription.unsubscribe();
    }

    ngOnChanges (changes: SimpleChanges) {
        if(changes['slides'] && changes['options']) {
            this.buildCarousel(changes.slides.currentValue, changes.options.currentValue)
        } else if(changes['slides']) {
            this.buildCarousel(changes.slides.currentValue, this.options)
        }
    }

    ngOnInit() {
      this.buildCarousel(this.slides, this.options)
    }

  buildCarousel(slides, options){
    this.$carouselService = new Ng2Carousel3dService(this.slides, this.options)
    this.percentSubscription = this.$carouselService.getPercent().subscribe(sub => {this.percentLoaded = sub.percent})
    this.autoRotationLocked = false
    this.$carouselService
          .build(this.slides || [], this.options || {})
          .then( (carousel) => {
                  this.carousel3d = carousel;

                  this.slides = this.carousel3d.slides;
                  this.controls = this.carousel3d.controls;
                  this.isLoading = false;
                  this.isSuccessful = true;

                  var outerHeight = this.carousel3d.getOuterHeight(),
                      outerWidth = this.carousel3d.getOuterWidth();

                  $('div.carousel-3d-container').css({'height': outerHeight + 'px'});



                    this.$wrapper = $('div.carousel-3d');
                    this.$wrapper.css({'width': outerWidth + 'px', 'height': outerHeight + 'px'});
                    this.$slides = this.$wrapper.children().toArray();

                    new Promise((resolve, reject) => {
                        resolve (this.render(true, this.carousel3d.animationSpeed))
                    }).then((res) => {
                        this.animationEnd();
                    })


              },
              // == Preloaded images reject  handler
              function handleReject(carousel) {

                  $().css({'height': carousel.getOuterHeight() + 'px'});

                  this.isLoading = false;
                  this.isSuccessful = false;
              },
              // == Preloaded images notify handler which is executed multiple times during preload
              function handleNotify(event) {
                  this.percentLoaded = event.percent;
              }
          );
  }

  render(animate, speedTime) {
    this.carousel3d.setSlides();

    var outerHeight = this.carousel3d.getOuterHeight(),
        outerWidth = this.carousel3d.getOuterWidth(),
        slideTop = (this.carousel3d.topSpace === 'auto') ? 0 : ((outerHeight / 2) - (outerHeight / 2)),
        slideLeft = ((this.carousel3d.width / 2) - (outerWidth / 2)),
        speed = (speedTime) ? (speedTime / 1000) : (this.carousel3d.animationSpeed / 1000),
        zIndex = 999;

    // == Set other slides styles
    this.carousel3d.slides.forEach((slide, index) => {
        var css = {
            position: 'absolute',
            opacity: 0,
            visibility: 'hidden',
            overflow: 'hidden',
            top: slideTop + 'px',
            'border-width': this.carousel3d.border + 'px',
            width: outerWidth + 'px',
            height: outerHeight + 'px'
        };

        if (animate) {
            var css2 =  { ...css,
                '-webkit-transition': 'all ' + speed + 's ',
                '-moz-transition': 'all ' + speed + 's ',
                '-o-transition': 'all ' + speed + 's ',
                '-ms-transition': 'all ' + speed + 's ',
                'transition': 'all ' + speed + 's '
            };
            this.getSlide(index).css(css2);
        }

        this.getSlide(index).css(css);
    });


    // == Set first slide styles
    this.getSlide(this.carousel3d.currentIndex)
        .addClass('current')
        .css({
            zIndex: zIndex,
            opacity: 1,
            visibility: 'visible',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-o-transform': 'none',
            '-ms-transform': 'none',
            'transform': 'none',
            left: slideLeft + 'px',
            top: slideTop + 'px',
            width: outerWidth + 'px',
            height: outerHeight + 'px'
        });

    this.carousel3d.rightSlides.forEach((slide, index) => {
        var css = this.setCss(index, zIndex, true);

        zIndex -= index + 1;

        this.getSlide(slide)
            .css(css)
            .css({
                opacity: 1,
                visibility: 'visible',
                zIndex: zIndex
            });
    });

    this.carousel3d.leftSlides.forEach((slide, index) => {
        var css = this.setCss(index, zIndex, false);

        zIndex -= index + 1;

        this.getSlide(slide)
            .css(css)
            .css({
                opacity: 1,
                visibility: 'visible',
                zIndex: zIndex
            });
    });

    if (this.carousel3d.total > this.carousel3d.visible) {

        var rCSS = this.setCss(this.carousel3d.rightSlides.length - 1, this.carousel3d.rightSlides.length - 1, true),
            lCSS = this.setCss(this.carousel3d.leftSlides.length - 1, this.carousel3d.leftSlides.length - 1, true);

        this.getSlide(this.carousel3d.rightOutSlide).css(rCSS);
        this.getSlide(this.carousel3d.leftOutSlide).css(lCSS);
    }

    this.isRendered = true;
    return true
}

  setCss(i, zIndex, positive) {

      var leftRemain = (this.carousel3d.space == 'auto') ? ((i + 1) * (this.carousel3d.width / 1.5)) : ((i + 1) * (this.carousel3d.space)),
          transform = (positive) ?
                      'translateX(' + (leftRemain) + 'px) translateZ(-' + (this.carousel3d.inverseScaling + ((i + 1) * 100)) + 'px) rotateY(-' + this.carousel3d.perspective + 'deg)' :
                      'translateX(-' + (leftRemain) + 'px) translateZ(-' + (this.carousel3d.inverseScaling + ((i + 1) * 100)) + 'px) rotateY(' + this.carousel3d.perspective + 'deg)',
          left = '0%',
          top = (this.carousel3d.topSpace === 'auto') ? 'none' : ((i + 1) * (this.carousel3d.space)),
          width = 'none',
          height = 'none',
          overflow = 'visible';

      return {
          '-webkit-transform': transform,
          '-moz-transform': transform,
          '-o-transform': transform,
          '-ms-transform': transform,
          'transform': transform,
          left: left,
          top: top,
          width: width,
          height: height,
          zIndex: zIndex,
          overflow: overflow
      };
  }

  goSlide(index) {
      var keepChanging = false;

      if (typeof this.onBeforeChange === 'function') {
        keepChanging = this.onBeforeChange({
          index: this.carousel3d.currentIndex
        });

        if (keepChanging === false) {
          return;
        }
      }

      this.carousel3d.setCurrentIndex((index < 0 || index > this.carousel3d.total - 1) ? 0 : index);

      if (this.carousel3d.isLastSlide()) {

          if (typeof this.onLastSlide === 'function') {
              this.onLastSlide({
                  index: this.carousel3d.currentIndex
              });
          }
      }

      this.$slides.forEach((slide, index) => {
          $().removeClass('current');
      });

      this.carousel3d.setLock(true);

      new Promise((resolve, reject) => {
          resolve (this.render(true, this.carousel3d.animationSpeed))
      }).then((res) => {
          this.animationEnd();
      })
  }

  goNext() {
      if (this.carousel3d.getLock() || (!this.carousel3d.loop && this.carousel3d.isLastSlide())) {
          return false;
      }

      if (this.carousel3d.isLastSlide()) {
          this.goSlide(0);
      } else {
          this.goSlide(this.carousel3d.currentIndex + 1);
      }

      return true;
  }

  goPrev() {
      if (this.carousel3d.getLock() || (!this.carousel3d.loop && this.carousel3d.isFirstSlide())) {
          return false;
      }

      if (this.carousel3d.isFirstSlide()) {
          this.goSlide(this.carousel3d.total - 1);
      } else {
          this.goSlide(this.carousel3d.currentIndex - 1);
      }

      return true;
  }

  goFar(index) {
      if (index === this.carousel3d.currentIndex) { return; }

      let visibleSlides = this.carousel3d.getVisibleSlidesIndex();

      let indexInVisibleSlides = visibleSlides.findIndex(val => val === index);
      if (indexInVisibleSlides < 0) { return; }
      let currentIndexInVisibleSlides = visibleSlides.findIndex(val => val === this.carousel3d.currentIndex);
      if (currentIndexInVisibleSlides < 0) { return; }

      let diff = indexInVisibleSlides - currentIndexInVisibleSlides;

      if (this.carousel3d.dir === 'ltr') {
          diff = -diff;
      }

      let diff2 = Math.abs(diff);

      let timeBuff = 0;
      const timeout = this.carousel3d.animationSpeed / diff2;

      for (let i = 0; i < diff2; i++, timeBuff += timeout) {
          setTimeout(() => {
              if (diff >= 0) {
                  this.goNext();
              } else {
                  this.goPrev();
              }
          }, timeBuff);
      }
  }

  animationEnd() {
      this.carousel3d.setLock(false);

      if (typeof this.onSlideChange === 'function') {
          this.onSlideChange({
              index: this.carousel3d.currentIndex
          });
      }
      if(!this.$timer) this.subscribe()
  }

  getSlide(index) {
      return (index >= 0) ? $(this.$slides[index]) : $(this.$slides[this.carousel3d.total + index]);
  }

  slideClicked(index) {

    if (this.$timer) {
        this.$timer.unsubscribe();
    }

    this.$timer = null

      if (this.carousel3d.currentIndex != index) {

          if (!this.carousel3d.clicking) {
              return false;
          } else {
              this.goFar(index);
          }

      } else {
          if (typeof this.onSelectedClick === 'function') {
              this.onSelectedClick({
                  index: this.carousel3d.currentIndex
              });
          }
      }
  }

  private subscribe(){
    this.$timer = Observable.timer(this.carousel3d.autoRotationSpeed, this.carousel3d.autoRotationSpeed).subscribe(() => {
        if (!this.carousel3d.autoRotationLocked){
            if (this.options['dir'] === 'ltr') {
                this.goNext();
            } else {
                this.goPrev();
            }
        }
    })
  }

  private setSlideLock(value) {
      this.$carouselService.setLock(value)
      this.autoRotationLocked = value
  }
}
