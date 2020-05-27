jQuery(document).ready(function () {
  jQuery(document).on('click', '.video-buttons .pause', function () {
    var $this = jQuery(this),
      mediaVideo = $this.parents('.video-area').find('video').get(0),
      mediaAudio = '',
      c_time = mediaVideo.currentTime;

    if (mediaAudio = $this.parents('.video-area').find('audio').get(0)) {
      if (mediaVideo.paused) {
        mediaAudio.currentTime = c_time;
        mediaAudio.play();
      } else {
        mediaAudio.pause();
      }
    }

    if (mediaVideo.paused) {
      mediaVideo.play();
      $this.removeClass('active');
    } else {
      mediaVideo.pause();
      $this.addClass('active');
    }
  });

  jQuery(document).on('click', '.video-buttons .mute', function () {
    var $this = jQuery(this),
      mediaVideo = $this.parents('.video-area').find('video').get(0),
      mediaAudio = $this.parents('.video-area').find('audio').get(0),
      c_time = mediaVideo.currentTime;

    if (mediaAudio) {
      if (mediaAudio.muted) {
        mediaAudio.currentTime = c_time;
        mediaAudio.muted = false;
        if (!mediaVideo.paused) {
          mediaAudio.play();
        }
        $this.addClass('active');
      } else {
        mediaAudio.muted = true;
        $this.removeClass('active');
      }
    } else {
      if (mediaVideo.muted) {
        mediaVideo.muted = false;
        $this.addClass('active');
      } else {
        mediaVideo.muted = true;
        $this.removeClass('active');
      }
    }
  });

  /*------------------------------------------------------------------
  [ Project slider ]
  */
  jQuery('.project-slider').each(function () {
    var head_slider = jQuery(this),
      head_slider_area = head_slider.parent();

    if (jQuery(this).find('.item').length > 1) {
      head_slider.on('initialized.owl.carousel translated.owl.carousel', function (event) {
        var index = event.item.index - 1,
          count = event.item.count;

        if (index > count) {
          index = 1;
        }
        if (index == 0) {
          index = count;
        }
        head_slider_area.find('.slider-navigation .count').html('<span>' + index + '</span> / <span>' + count + '</span>');

        head_slider_area.find('.slider-navigation > div > .line').addClass('go').removeClass('reset');
      });

      head_slider_area.find('.slider-navigation .prev').on('click', function () {
        head_slider.trigger('prev.owl.carousel');
      });

      head_slider_area.find('.slider-navigation .next').on('click', function () {
        head_slider.trigger('next.owl.carousel');
      });

      head_slider.addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoHeight: true,
        navText: false,
      });
    }
  });

  /*------------------------------------------------------------------
  [ Accordion ]
  */

  jQuery('.accordion-item').on('click', '.label', function () {
    if (jQuery(this).parent().hasClass('active')) {
      jQuery(this).parent().removeClass('active').find('.text').slideUp();
    } else {
      jQuery(this).parent().addClass('active').find('.text').slideDown();
      jQuery(this).parent().siblings().removeClass('active').find('.text').slideUp();
    }
  });

  /*------------------------------------------------------------------
  [ Project horizontal slider ]
  */
  jQuery('.project-horizontal-slider').each(function () {
    var head_slider = jQuery(this);
    if (head_slider.find('.item').length > 1) {
      head_slider.imagesLoaded(function () {
        head_slider.addClass('owl-carousel').owlCarousel({
          items: 1,
          nav: true,
          dots: false,
          autoplay: false,
          autoWidth: true,
          navClass: ['owl-prev base-icons-prev', 'owl-next base-icons-next'],
          navText: false,
          margin: 30,
          responsive: {
            0: {
              nav: false,
            },
            480: {

            },
            768: {
              nav: true,
            },
          }
        });
      });
      head_slider.on('mousewheel wheel', '.owl-stage', function (e) {
        if (e.originalEvent.deltaY > 0) {
          head_slider.trigger('next.owl');
        } else {
          head_slider.trigger('prev.owl');
        }
        e.preventDefault();
      });
    }
  });

  /*------------------------------------------------------------------
  [ Project horizontal slider ]
  */
  jQuery('.photo-carousel .carousel').each(function () {
    var head_slider = jQuery(this);
    if (head_slider.find('.item').length > 1) {
      head_slider.addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 2000,
        autoWidth: false,
        navText: false,
        responsive: {
          0: {
            items: 2
          },
          480: {
            items: 3
          },
          768: {
            items: 4
          },
          980: {
            items: 5
          },
          1200: {
            items: 6
          },
          1400: {
            items: 7
          },
          1700: {
            items: 8
          },
          1980: {
            items: 9
          },
        }
      });
    }
  });

  jQuery(window).on("load", function () {
    /*------------------------------------------------------------------
    [ Portfolio items & filtering ]
    */

    jQuery(document).on('click', '.blog-block .filter-button-group button:not(.active),.portfolio-block .filter-button-group button:not(.active)', function () {
      var $grid = jQuery(this).parents('.portfolio-block, .blog-block').find('.isotope');

      if ($grid.length == 0) return;

      jQuery(this).addClass('active').siblings().removeClass('active');

      var filterValue = jQuery(this).attr('data-filter');
      if (jQuery(this).parents('.portfolio-block, .blog-block').find('.loadmore-button').length > 0) {
        jQuery(this).parents('.portfolio-block, .blog-block').find('.loadmore-button').trigger('click', [false]);
      } else {
        $grid.isotope({
          filter: filterValue
        });
      }

      jQuery(window).trigger('resize').trigger('scroll');
    });


    jQuery('.portfolio-items:not(.disable-iso)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: 'article',
        horizontalOrder: true,
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });
    });

    jQuery('.post-gallery-grid:not(.disable-iso)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.col-xs-12',
        horizontalOrder: true
      });
    });

    jQuery('.portfolio-type-justified').each(function () {
      var gap = 15;
      if (jQuery(this).hasClass('gap-off')) {
        gap = 0;
      }
      jQuery(this).justifiedGallery({
        rowHeight: 250,
        selector: 'article',
        imgSelector: 'img',
        captions: false,
        margins: gap
      });
    });

    /*------------------------------------------------------------------
    [ Blog items & filtering ]
    */
    jQuery('.blog-items:not(.disable-iso)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: 'article'
      });
    });

    /*------------------------------------------------------------------
    [ Team ]
    */
    jQuery('.team-items:not(.owl-carousel)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.col-xs-12'
      });
    });

    jQuery('.js-pixproof-gallery').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.proof-photo'
      });
    });

    /*------------------------------------------------------------------
    [ Price list ]
    */
    jQuery('.price-list').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.price-list-item'
      });
    });

    /*------------------------------------------------------------------
    [ Price list ]
    */
    jQuery('.products.filter-items').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.col-xs-12'
      });
    });
  });

  /*------------------------------------------------------------------
  [ Image Comparison Slider ]
  */

  jQuery(document).ready(function () {
    jQuery('.image-comparison-slider').each(function () {
      var cur = jQuery(this);
      var width = cur.width() + 'px';
      cur.find('.resize .old').css('width', width);
      drags(cur.find('.line'), cur.find('.resize'), cur);
    });
  });

  jQuery(window).resize(function () {
    jQuery('.image-comparison-slider').each(function () {
      var cur = jQuery(this);
      var width = cur.width() + 'px';
      cur.find('.resize .old').css('width', width);
    });
  });

  function drags(dragElement, resizeElement, container) {

    dragElement.on('mousedown touchstart', function (e) {

      dragElement.addClass('draggable');
      resizeElement.addClass('resizable');

      var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX,
        dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth(),
        minLeft = containerOffset + 80,
        maxLeft = containerOffset + containerWidth - dragWidth - 80;

      dragElement.parents().on("mousemove touchmove", function (e) {

        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX,
          leftValue = moveX + posX - dragWidth;

        if (leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

        jQuery('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
          jQuery(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
        });
        jQuery('.resizable').css('width', widthValue);
      }).on('mouseup touchend touchcancel', function () {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      e.preventDefault();
    }).on('mouseup touchend touchcancel', function (e) {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
  }

  /*------------------------------------------------------------------
  [ Animations ]
  */

  jQuery(window).on('load scroll', function () {
    jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function () {
      var th = jQuery(this);
      th.imagesLoaded(function () {
        var top = jQuery(document).scrollTop() + jQuery(window).height(),
          pos_top = th.offset().top;
        if (top > pos_top) {
          th.addClass('wpb_start_animation animated');
        }
      });
    });

    jQuery('.skill-item .rating-line').each(function () {
      var top = jQuery(document).scrollTop() + jQuery(window).height(),
        pos_top = jQuery(this).offset().top,
        val = jQuery(this).data('percent');
      if (top > pos_top) {
        if (!jQuery(this).hasClass('animated')) {
          jQuery(this).addClass('animated').find('.line div').css('width', val + '%');
        }
      }
    });
  });

  jQuery(window).scroll(num_scr);

  function num_scr() {
    jQuery('.num-box-items .item .num').each(function () {
      var top = jQuery(document).scrollTop() + jQuery(window).height();
      var pos_top = jQuery(this).offset().top;
      if (top > pos_top) {
        jQuery(window).off("scroll", num_scr);
        if (!jQuery(this).hasClass('animated')) {
          jQuery(this).addClass('animated').prop('Counter', 0).animate({
            Counter: jQuery(this).text()
          }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              jQuery(this).text(Math.ceil(now));
            }
          });
        }
      }
    });
  }

  var l_button_index = 0;
  jQuery('.project-image-load-button .button-style3').on('click', function () {
    var $this = jQuery(this),
      $wrap = $this.parents('.project-grid-page'),
      $load_items = $wrap.find('.load-items'),
      cout_pages = $load_items.length;

    l_button_index++;
    if (cout_pages == 1) {
      jQuery(this).parent().fadeOut();
    }
    var items = $wrap.find('.load-items' + l_button_index).find('.col-xs-12');
    $wrap.find('.load-items' + l_button_index).remove();

    $wrap.find('.post-gallery-grid').append(items).isotope('appended', items);

    return false;
  });

  jQuery('.portfolio-block, .blog-block').YPRMLoadMore();

  if (jQuery('.popup-gallery').length > 0) {
    jQuery('body').append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div><div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div></div></div></div></div>')

    var $pswp = jQuery('.pswp')[0];
    var image = [];

    jQuery(document).on('click', '.popup-gallery .popup-item a', function (event) {
      if (!jQuery(this).hasClass('permalink')) {
        var image = [];
        var $pic = jQuery(this).parents('.popup-gallery');

        var getItems = function () {
          var items = [],
            $el = '';
          if ($pic.hasClass('owl-carousel')) {
            $el = $pic.find('.owl-item:not(.cloned) a:visible');
          } else {
            $el = $pic.find('.popup-item a:not(.permalink)');
          }

          $el.each(function () {
            if (!jQuery(this).hasClass('permalink')) {
              var $href = jQuery(this).attr('href'),
                $size = jQuery(this).data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

              if (jQuery(this).data('type') == 'video') {
                var item = {
                  html: jQuery(this).data('video')
                };
              } else {
                var item = {
                  src: $href,
                  w: $width,
                  h: $height
                }
              }

              items.push(item);
            }
          });
          return items;
        }

        var items = getItems();

        jQuery.each(items, function (index, value) {
          image[index] = new Image();
          if (value['src']) {
            image[index].src = value['src'];
          }
        });

        event.preventDefault();

        var $index = jQuery(this).parents('.popup-item').index();

        if (jQuery(this).parent().hasClass('thumbnails')) {
          $index++;
        }
        if ($pic.hasClass('owl-carousel')) {
          $index = jQuery(this).data('id');
        }
        if (jQuery(this).parents('.popup-gallery').find('.grid-sizer').length > 0) {
          $index = $index - 1;
        }
        var options = {
          index: $index,
          bgOpacity: 0.7,
          showHideOpacity: true
        }

        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
        lightBox.init();

        lightBox.listen('beforeChange', function () {
          var currItem = jQuery(lightBox.currItem.container);
          jQuery('.pswp__video').removeClass('active');
          var currItemIframe = currItem.find('.pswp__video').addClass('active');
          jQuery('.pswp__video').each(function () {
            if (!jQuery(this).hasClass('active')) {
              jQuery(this).attr('src', jQuery(this).attr('src'));
            }
          });
        });

        lightBox.listen('close', function () {
          jQuery('.pswp__item .pswp__zoom-wrap').remove();
        });
      }
    });
  }
});

(function (jQuery) {
  "use strict";
  jQuery.fn.YPRMLoadMore = function (options) {

    function rebuild_array(src, filt) {
      var result = [];

      for (let index = 0; index < src.length; index++) {
        let id = src[index].id,
          flag = false;
        for (let index2 = 0; index2 < filt.length; index2++) {
          let id2 = filt[index2].id;
          if (id == id2) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          result.push(src[index]);
        }
      }

      return JSON.stringify(result);
    }

    function getFromCategory(array, slug, count, return_type) {
      var result = [],
        i = 0;

      for (let index = 0; index < array.length; index++) {
        let flag = false;

        if(typeof array[index].cat === undefined || typeof array[index].cat === 'undefined') continue;

        for (let index2 = 0; index2 < array[index].cat.length; index2++) {
          if (array[index].cat[index2] == slug) {
            flag = true;
            break;
          }
        }
        if (flag) {
          i++;
          result.push(array[index]);
        }

        if (i == count && !return_type) {
          break;
        }
      }

      if (result == []) {
        return false;
      }

      return result;
    }

    return this.each(function () {
      var $this = jQuery(this),
      $button = $this.find('.loadmore-button'),
      $filter = $this.find('[class^="filter-butt"]'),
      $items = $this.find('.load-wrap'),
      type = $button.attr('data-type'),
      action = 'loadmore_'+$button.attr('data-action'),
      count = $button.attr('data-count'),
      style = $button.attr('data-style');

      $this.append('<div class="load-items-area"></div>');

      $items.css('min-height', $items.find('article').height());

      $button.on('click', function (event, loading) {
        if(typeof loading === undefined || loading === undefined) {
          loading = true
        }

        var array = JSON.parse($button.attr('data-array')),
        atts = JSON.parse($button.attr('data-atts')),
        load_items = array.slice(0, count),
        filter_value = '*';

        if ($filter.length > 0) {
          var filter_value = $filter.find('.active').attr('data-filter'),
          slug = filter_value.replace('.category-', ''),
          current_count = $items.find(filter_value).length;

          if (filter_value != '*') {
            var cat_full_length = getFromCategory(array, slug, count, true).length,
            cat_length = getFromCategory(array, slug, count, false).length;

            if (current_count < count && cat_full_length != 0) {
              load_items = getFromCategory(array, slug, count - current_count, false);
              loading = true;
            } else if (loading) {
              load_items = getFromCategory(array, slug, count, false);
            }

            if((loading && cat_full_length - load_items.length <= 0) || (!loading && cat_full_length == 0)) {
              $button.fadeOut();
            } else {
              $button.fadeIn();
            }
          } else {
            $button.fadeIn();
          }

          $items.isotope({
            filter: filter_value
          });
        }

        if (!loading) {
          return false;
        }

        $button.addClass('loading');

        jQuery.ajax({
          url: yprm_ajax.url,
          type: "POST",
          data: {
            action: action,
            array: load_items,
            atts: atts,
            type: type,
            style: style,
            start_index: $this.find('article').length
          },
          success: function (data) {
            var temp_block = $this.find('.load-items-area').append(data);
            array = rebuild_array(array, load_items);

            console.log(data);

            temp_block.imagesLoaded(function () {

              var items = temp_block.find('article');

              if($items.hasClass('isotope')) {
                $items.append(items).isotope('appended', items).isotope({
                  filter: filter_value
                }).queue(function (next) {
                  jQuery(this).find('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').each(function () {
                    var $el = jQuery(this);
  
                    $el.vcwaypoint(function () {
                      $el.addClass("wpb_start_animation animated")
                    }, {
                      offset: "85%"
                    });
                  });
                  next();
                });
              } else {
                $items.append(items).queue(function (next) {
                  jQuery(this).find('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').each(function () {
                    var $el = jQuery(this);
  
                    $el.vcwaypoint(function () {
                      $el.addClass("wpb_start_animation animated")
                    }, {
                      offset: "85%"
                    });
                  });
                  next();
                });
              }
              
            });

            $button.attr('data-array', array).removeClass('loading');
            if (array == '[]') {
              $button.parent().slideUp();
            }
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          }
        });
      });
    });
  };

})(jQuery);