/*------------------------------------------------------------------
[Master Scripts]

Project:    Sansara Theme
Version:    2.0.4

[Table of contents]

[Components]

	-Preloader
	-Stick sidebar
	-Dropdown img
	-Equal Height function
	-Navigation open
	-Search
	-Mobile menu
	-Fixed header
	-Screen rezise events
	-Fix centered container
	-Blog items & filtering
	-Full sreen navigation
	-Animation
	-Animation
	-Load more
	-Comment reply
	-Popup image
	-Parallax
	-Tabs
	-Quantity
	
-------------------------------------------------------------------*/

"use strict";

/*------------------------------------------------------------------
[ Preloader ]
*/
jQuery(window).on('load', function () {
  jQuery('body').addClass('loaded');

  jQuery(window).trigger('resize').trigger('scroll');
  jQuery('.owl-carousel').trigger('refresh.owl.carousel');

  setTimeout(function () {
    jQuery('.preloader-default-area, .preloader-area').remove();
  }, 2500);

  setTimeout(function () {
    jQuery(window).trigger('resize').trigger('scroll');
    jQuery('.owl-carousel').trigger('refresh.owl.carousel');
  }, 1000)
});

function leadZero(n) {
  return (n < 10 ? '0' : '') + n;
}

jQuery('.side-navigation .sub-menu').each(function () {
  jQuery(this).prepend('<li class="back solid-arrow-collection-left-arrow-1"></li>');
});

/*------------------------------------------------------------------
[ Equal Height function ]
*/
function equalHeight(group) {
  if (jQuery(window).width() > '768') {
    var tallest = 0;
    jQuery(group).each(function () {
      var thisHeight = jQuery(this).css('height', '').outerHeight();
      if (thisHeight > tallest) {
        tallest = thisHeight;
      }
    });
    jQuery(group).css('height', tallest);
  } else {
    jQuery(group).css('height', '');
  }
}

function equalWidth(group) {
  if (jQuery(window).width() > '768') {
    var tallest = 0;
    jQuery(group).each(function () {
      var thisWidth = jQuery(this).css('width', '').outerWidth();
      if (thisWidth > tallest) {
        tallest = thisWidth;
      }
    });
    jQuery(group).css('width', tallest);
  } else {
    jQuery(group).css('width', '');
  }
}

jQuery('.mouse-cursor').each(function () {
  var $this = jQuery(this);
  jQuery('body').addClass('cursor-disabled');
  jQuery(window).on('mousemove', function (event) {
    $this.css({
      'top': event.pageY + 'px',
      'left': event.pageX + 'px'
    });
  });
});

jQuery('.mega-menu').each(function () {
  var $this = jQuery(this),
    cols_count = $this.find('.sub-menu.mega-menu-row').length;

  $this.addClass('cols-' + cols_count);
});

jQuery('a.button-style1, div.button-style1, button.button-style1').each(function () {
  var label = jQuery(this).find('span').html();
  if (label) {
    jQuery(this).append('<span>' + label + '</span>');
  } else {
    label = jQuery(this).html()
    jQuery(this).html('<span>' + label + '</span><span>' + label + '</span>');
  }
});

jQuery('input.style1, textarea.style1').each(function () {
  var $this = jQuery(this);
  $this.wrap('<div class="input-row-s1"></div>');
});

jQuery(document).ready(function () {



  /*------------------------------------------------------------------
  [ Right click disable ]
  */

  jQuery('.right-click-disable').on('contextmenu', function () {
    jQuery('.right-click-disable-message').addClass('active');
    return false;
  });

  jQuery('.right-click-disable-message:not(.lic)').on('click', function () {
    jQuery(this).removeClass('active');
    return false;
  });


  jQuery('input.style1, textarea.style1').on('focusin', function () {
    var $this = jQuery(this);
    $this.parent('.input-row-s1').addClass('focus');
  }).on('focusout', function () {
    var $this = jQuery(this);
    if (!$this.val()) {
      $this.parent('.input-row-s1').removeClass('focus');
    }
  });

  jQuery('.project-side-images').each(function () {
    jQuery(this).find("[data-sticky_column]").stick_in_parent({
      parent: "[data-sticky_parent]"
    });

    jQuery(window).on("resize", (function (_this) {
      return function (e) {
        if (jQuery(window).width() > 768) {
          return jQuery(document.body).trigger("sticky_kit:recalc");
        } else {
          return jQuery(document.body).trigger("sticky_kit:detach");
        }
      };
    })(this));
  });

  jQuery('.wpb_fixed').each(function () {
    var this_el = jQuery(this);
    this_el.children('.wpb_column').stick_in_parent({
      parent: ".wpb_fixed"
    });

    jQuery(window).on("resize", (function (_this) {
      return function (e) {
        if (jQuery(window).width() > 768) {
          return this_el.trigger("sticky_kit:recalc");
        } else {
          return this_el.trigger("sticky_kit:detach");
        }
      };
    })(this));
  });

  if (jQuery('.navigation > ul > li').length > 6) {
    jQuery('.navigation').addClass('min');
  }

  jQuery('#wpadminbar').addClass('wpadminbar');

  /*------------------------------------------------------------------
  [ Search ]
  */

  jQuery('.site-header .search-button').on("click", function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.search-popup').fadeOut();
    } else {
      jQuery(this).addClass('active');
      jQuery('.search-popup').fadeIn();
    }
  });

  jQuery('.search-popup .close').on("click", function () {
    jQuery('.site-header .search-button').removeClass('active');
    jQuery('.search-popup').fadeOut();
  });

  /*------------------------------------------------------------------
  [ Navigation ]
  */

  jQuery('.butter-button.hidden_menu, .butter-button.visible_menu, .butter-button.centered_menu').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.navigation').removeClass('active');
      jQuery('body').removeClass('navigation-opened');
    } else {
      jQuery(this).addClass('active');
      jQuery('.navigation').addClass('active');
      jQuery('body').addClass('navigation-opened');
    }
  });

  jQuery('.butter-button.minified-button').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active').find('.butter-button').removeClass('active');
      jQuery('.minified-block, .navigation, .butter-button.hidden_menu').removeClass('active');
      jQuery('body').removeClass('navigation-opened');
    } else {
      jQuery(this).addClass('active').find('.butter-button').addClass('active');
      jQuery('.minified-block, .navigation, .butter-button.hidden_menu').addClass('active');
      jQuery('body').addClass('navigation-opened');
    }
  });

  jQuery('.butter-button.full_screen').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.full-screen-nav').fadeOut();
    } else {
      jQuery(this).addClass('active');
      jQuery('.full-screen-nav').fadeIn();
    }
  });

  jQuery('.full-screen-nav .close').on("click", function () {
    jQuery('.butter-button.full_screen').removeClass('active');
    jQuery('.full-screen-nav').fadeOut();
  });

  jQuery('.butter-button.on_side').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.right-side-nav').removeClass('active');
    } else {
      jQuery(this).addClass('active');
      jQuery('.right-side-nav').addClass('active');
    }
  });

  jQuery('.right-side-nav .close').on("click", function () {
    jQuery('.butter-button.on_side').removeClass('active');
    jQuery('.right-side-nav').removeClass('active');
  });

  jQuery('.full-screen-nav .menu-item-has-children > a').on("click", function () {
    if (!jQuery(this).hasClass('active')) {
      jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().parent().siblings().children('a').removeClass('active').next('.sub-menu').slideUp();
      return false;
    }
  });

  jQuery('.side-navigation ul li.menu-item-has-children > a,.side-navigation ul li.page_item_has_children > a').on('click', function () {
    jQuery(this).parents('li').addClass('active-child');
    return false;
  });

  jQuery('.side-navigation .sub-menu .back,.side-navigation .children .back').on('click', function () {
    jQuery(this).parent().parent().removeClass('active-child');
    return false;
  });

  jQuery('.right-side-navigation ul li.menu-item-has-children > a').on('click', function () {
    if (jQuery(this).parent().hasClass('active')) {
      jQuery(this).parent().removeClass('active').find('.sub-menu').slideUp().find('.active').removeClass('active');
    } else {
      jQuery(this).parent().addClass('active').children('.sub-menu').slideDown();
    }

    return false;
  });

  jQuery('.full-screen-nav .close').on("click", function () {
    jQuery('.butter-button.full_screen').removeClass('active');
    jQuery('.full-screen-nav').fadeOut();
  });

  jQuery('.side-nav-button').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.side-navigation-block').removeClass('active');
    } else {
      jQuery(this).addClass('active');
      jQuery('.side-navigation-block').addClass('active');
    }
  });

  jQuery('.side-navigation-block .close').on("click", function () {
    jQuery('.side-nav-button').removeClass('active');
    jQuery('.side-navigation-block').removeClass('active');
  });

  jQuery('.button-style1').on('mouseover', function () {
    jQuery(this).removeClass('out').addClass('over');
  }).on('mouseout', function () {
    var b = jQuery(this);
    b.removeClass('over').addClass('out');
    setTimeout(function () {
      b.removeClass('out')
    }, 800);
  });

  /*------------------------------------------------------------------
  [ Side bar ]
  */

  jQuery('.sidebar-button').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.side-bar-area').removeClass('active');
    } else {
      jQuery(this).addClass('active');
      jQuery('.side-bar-area').addClass('active');
    }
  });

  jQuery('.side-bar-area .close').on("click", function () {
    jQuery('.side-bar-area').removeClass('active');
  });

  /*------------------------------------------------------------------
  [ Fixed header ]
  */

  jQuery(window).on("load resize scroll", function () {
    if (jQuery(document).scrollTop() > 0) {
      jQuery('.site-header').addClass('fixed');
    } else {
      jQuery('.site-header').removeClass('fixed');
    }
  });

  jQuery('.wrap-lines .social-buttons-hidden').on('mouseenter', function () {
    jQuery('.banner-area .slider-navigation').fadeOut();
  });

  jQuery('.wrap-lines .social-buttons-hidden').on('mouseleave', function () {
    jQuery('.banner-area .slider-navigation').fadeIn();
  });

  /*------------------------------------------------------------------
  [ Screen rezise events ]
  */

  var nav_el = '';
  if (jQuery('.navigation').hasClass('visible_menu')) {
    nav_el = 'yes';
  }
  jQuery(window).on("load resize", function () {
    jQuery('.banner-area').each(function () {
      if ((jQuery(this).offset().top - jQuery('#wpadminbar').outerHeight()) == 0) {
        jQuery(this).addClass('on-top').find('.container > .cell').css('padding-top', parseInt(30 + jQuery('#wpadminbar').outerHeight() + jQuery('.site-header').outerHeight()))
      }
    });

    /*------------------------------------------------------------------
    [ Mobile menu ]
    */
    if (jQuery(window).width() <= '768') {
      jQuery('.navigation .menu-item-has-children > a').on("click", function () {
        if (!jQuery(this).hasClass('active')) {
          jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
          jQuery(this).addClass('active').parent().children('.mega-menu').slideDown().siblings().children('.mega-menu').slideUp();
          return false;
        }
      });
    }


    jQuery('.header-space').css('height', jQuery('.site-header').outerHeight() + jQuery('.header + .navigation').outerHeight());

    jQuery('main.main-row').css('min-height', jQuery(window).outerHeight() - jQuery('.site-footer').outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());

    jQuery('.project-horizontal-slider').each(function () {
      var val = parseInt((jQuery(window).outerHeight() - jQuery('.site-footer').outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight() - jQuery('.project-horizontal-slider').height()) / 2);

      if (val < 0) {
        val = 0;
      }

      jQuery(this).css('margin-top', val);
    });

    jQuery('.block-404 .cell').css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());

    jQuery('.protected-post-form .cell').css('height', jQuery(window).outerHeight() - jQuery('.site-footer').outerHeight() - jQuery('.footer-social-button').outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight() - parseInt(jQuery('#all').css('padding-top')) - parseInt(jQuery('#all').css('padding-bottom')))

    jQuery('.banner:not(.fixed-height)').each(function () {
      var coef = 0;
      jQuery(this).css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight() - coef);
      jQuery(this).find('.item, .cell').css('height', jQuery(this).height());
    });
    jQuery('.banner.fixed-height').each(function () {
      jQuery(this).find('.item, .cell').css('height', jQuery(this).height());
    });

    jQuery('.full-screen-nav .cell').css('height', jQuery(window).height() - 20 - jQuery('#wpadminbar').height() - jQuery('.ypromo-site-bar').outerHeight());

    jQuery('.music-banner').each(function () {
      var height = jQuery(this).find('.banner').height();
      jQuery(this).find('.one-screen-block .cell').css('height', height);
    });

    jQuery('.block-coming-soon.fixed-height').each(function () {
      var height = jQuery(this).height();

      jQuery(this).find('.cell').css('height', 'auto').css('height', height);
    });

    if (nav_el == "yes") {
      if (jQuery(window).outerWidth() > 768) {
        jQuery('.navigation').addClass('visible_menu');
        jQuery('.butter-button').addClass('hidden');
      } else {
        jQuery('.navigation').removeClass('visible_menu');
        jQuery('.butter-button').removeClass('hidden').removeClass('active');
      }
    }

    jQuery('.banner-categories-carousel').each(function () {
      var area = jQuery(this).parent('.banner-area').height();
      jQuery(this).find('.item').css('height', area);
    });

    jQuery('div[data-vc-full-width-mod="true"]').each(function () {
      var coef = (jQuery('.container').outerWidth(true) - jQuery('#all').width()) / 2;
      jQuery(this).css('left', coef).css('width', jQuery('#all').width());
    });

    jQuery('.blog-type-grid').each(function () {
      //equalHeight(jQuery(this).find('.blog-item h5'));
    });

    jQuery('.products.filter-items').each(function () {
      equalHeight(jQuery(this).find('.product'));
    });

    jQuery('.testimonials-type2').each(function () {
      equalHeight(jQuery(this).find('.testimonial-item-type2'));
      equalHeight(jQuery(this).find('.testimonial-item-type2 .quote'));
    });

    jQuery('.mega-sub-menu').each(function () {
      equalHeight(jQuery(this).children('.mega-menu-column'));
    });

    jQuery('.side-header .wrap').each(function () {
      var height = jQuery(this).height();
      jQuery(this).find('.cell').css('height', height);
    });

    jQuery('.project-horizontal .cell').css('height', jQuery('.project-horizontal').outerHeight());

    jQuery('.ph-slider .item img, .ph-slider, .portfolio-h .cell').css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').height() - jQuery('.site-footer').outerHeight() - jQuery('.minified-footer').outerHeight() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight());

    jQuery('.projects-slider').css('height', jQuery(window).outerHeight() - jQuery('.site-footer').outerHeight() - jQuery('.site-header').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight());

    jQuery('.portfolio-h').each(function () {
      var parent_w = jQuery(this).width();

      jQuery(this).find('.ph-slider-area').css('margin-right', -(jQuery(window).width() - parent_w) / 2);
    });

    jQuery('.about-us-img-on-bottom').each(function () {
      var offset_top = parseInt(jQuery(this).offset().top),
        w_height = parseInt(jQuery(window).outerHeight() - jQuery('.header-space:visible').height());

      jQuery(this).css('padding-top', parseInt(w_height - offset_top - jQuery(this).height()));
    });

    jQuery('.project-type1').css('min-height', jQuery(window).outerHeight() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight());

    jQuery('.side-navigation-block .cell').css('height', jQuery('.side-navigation-block .wrap').height());

    /*------------------------------------------------------------------
    [ Fix centered container ]
    */
    jQuery('.centered-container').each(function () {
      var width = parseInt(Math.round(jQuery(this).width()).toFixed(0)),
        height = parseInt(Math.round(jQuery(this).height()).toFixed(0));

      jQuery(this).css('width', '').css('height', '');

      if (width & 1) {
        jQuery(this).css('width', (width + 1) + 'px');
      }

      if (height & 1) {
        jQuery(this).css('height', (height + 1) + 'px');
      }
    });

    /*------------------------------------------------------------------
    [ Parallax ]
    */
    jQuery('.background-parallax').each(function () {
      var wScroll = jQuery(window).scrollTop() - jQuery(this).parent().offset().top + jQuery('#wpadminbar').height() + jQuery('.header-space').height() - jQuery('.ypromo-site-bar').outerHeight();
      jQuery(this).css('transform', 'translate(0px,' + wScroll + 'px)');
      jQuery(this).parents('.owl-carousel').find('.owl-nav div').css('margin-top', wScroll);
    });

    jQuery('.right-side-nav').each(function () {
      var width = parseInt(((jQuery(window).width() - jQuery('.site-header > div').width()) / 2) + 260);
      jQuery(this).css('width', width);
    });

    jQuery('.project-bottom').each(function () {
      var left_offset = parseInt(-(jQuery(window).width() - jQuery(this).parent().outerWidth()) / 2);

      jQuery(this).css({
        'margin-left': left_offset,
        'width': jQuery(window).width()
      });
    });

    jQuery('.project-horizontal-slider').each(function () {
      jQuery(this).find('.item > img').css('height', parseInt(jQuery(this).find('.item.content-item').height()));
      jQuery(this).find('.item.phs-nav').css('height', parseInt(jQuery(this).find('.item.content-item').height()));
      jQuery(this).find('.item.phs-nav .ps-bottom').css('width', parseInt(jQuery(this).find('.item.content-item').height()));
    });

    jQuery('.navigation-img').each(function () {
      jQuery(this).css('height', parseInt(jQuery(this).parents('.mega-menu-row').height()));
    });

    jQuery('.one-screen-area').each(function () {
      var $this = jQuery(this),
        rows = $this.find('.portfolio-cols-slider').data('rows');

      if (jQuery(window).width() <= 768) {
        rows = 1;
      }

      $this.css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight());
      $this.find('.item').css('height', $this.height());
      $this.find('.one-screen-contact .content .cell').css('height', $this.height());

      if (rows) {
        $this.find('.pcs-item .cell').css('height', $this.height() / rows);
      }
    });

    jQuery('.vertical-parallax-slider .vps-item.last').each(function () {
      jQuery(this).css('bottom', -parseInt(jQuery('.vertical-parallax-slider .vps-item.last').outerHeight() - jQuery('.vps-item .page-title').position().top - jQuery('.vps-item .page-title').outerHeight(true)));
    });

    jQuery('.wrap-lines').each(function () {
      var $this = jQuery(this),
        $header = jQuery('.site-header'),
        window_h = jQuery(window).outerHeight() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight(),
        logo_h = 0,
        logo_p = 0,
        fr_h = 0,
        fr_p = 0;

      if ($header.find('.logo .l-b:visible').length > 0) {
        logo_h = $header.find('.logo .l-b:visible').height();
        logo_p = $header.find('.logo .l-b:visible').position().top + jQuery('.ypromo-site-bar').outerHeight();
      }

      if ($header.find('.fr').length > 0) {
        fr_h = $header.find('.fr').height();
        fr_p = $header.find('.fr').position().top + jQuery('.ypromo-site-bar').outerHeight();
      }

      $this.find('.left').css('left', parseInt($header.children('div').offset().left));
      $this.find('.left .top, .right .top').css('height', parseInt(logo_p - 10));
      if ($this.find('.social-buttons-hidden').length > 0) {
        $this.find('.left .middle').css({
          'height': parseInt(window_h - logo_p - logo_h - 95 + jQuery('.header-space:visible').height() + jQuery('.ypromo-site-bar').outerHeight()),
          'top': parseInt(logo_p + logo_h + 10),
        });
        $this.find('.left .bottom').css('height', 30);
      } else {
        $this.find('.left .bottom').css('height', parseInt(window_h - logo_p - logo_h - 10 + jQuery('.header-space:visible').height() + jQuery('.ypromo-site-bar').outerHeight()));
      }

      $this.find('.right').css('right', parseInt(jQuery(window).width() - $header.children('div').outerWidth() - $header.children('div').offset().left));
      if (fr_h != 0) {
        if (jQuery('body').find('.full-screen-area.navigation-style3 .fc-navigation').length > 0) {
          var $nav = jQuery('.full-screen-area.navigation-style3 .fc-navigation'),
            nav_top = $nav.offset().top - jQuery('#wpadminbar').outerHeight(),
            nav_height = $nav.height();

          $nav.css('right', parseInt(jQuery(window).width() - $this.find('.right').offset().left + 10));

          $this.find('.right .middle').css({
            'height': parseInt(nav_top - 40 - logo_p - logo_h - 10),
            'top': parseInt(logo_p + logo_h + 10),
          });

          $this.find('.right .bottom').css('height', parseInt(window_h - nav_top - nav_height - 40 + jQuery('.header-space:visible').height() + jQuery('.ypromo-site-bar').outerHeight()));
        } else {
          $this.find('.right .bottom').css('height', parseInt(window_h - logo_p - logo_h - 10 + jQuery('.header-space:visible').height() + jQuery('.ypromo-site-bar').outerHeight()));
        }
      } else {
        $this.find('.right .top').css('height', parseInt(window_h));
      }
    });

    jQuery('.navigation.centered_menu').each(function () {
      var $this = jQuery(this),
        this_w = $this.width(),
        $container = $this.parent().parent(),
        $container_fr = $container.find('.fr'),
        container_w = $container.width();

      $this.css('margin-right', 0);
      $this.css('margin-right', parseInt((container_w / 2) - ($container_fr.width() - this_w) - this_w / 2));
    });

    jQuery('.album-area').each(function () {
      if (jQuery(this).find('.album-cover').length > 0) {
        var cover_height = jQuery(this).find('.album-cover').outerHeight(),
          top_height = jQuery(this).find('.top').outerHeight();

        jQuery(this).find('.jp-playlist').css('height', cover_height - top_height);
      }
    });
  });

  setTimeout(function () {
    jQuery(window).trigger('resize').trigger('scroll');
  }, 500);

  /*------------------------------------------------------------------
  [ Scroll top button ]
  */

  jQuery('#scroll-top').on("click", function () {
    jQuery('body, html').animate({
      scrollTop: '0'
    }, 1100);
    return false;
  });

  /*------------------------------------------------------------------
  [ Comment reply ]
  */

  jQuery('.replytocom').on('click', function () {
    var id_parent = jQuery(this).attr('data-id');
    jQuery('#comment_parent').val(id_parent);
    jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));
    jQuery('#cancel-comment-reply-link').show();
    return false;
  });

  jQuery('#cancel-comment-reply-link').on('click', function () {
    jQuery('#comment_parent').val('0');
    jQuery('#respond').appendTo(jQuery('#commentform-area'));
    jQuery('#cancel-comment-reply-link').hide();
    return false;
  });

  /*------------------------------------------------------------------
  [ Quantity ]
  */

  jQuery('.quantity .down').on("click", function () {
    var val = jQuery(this).parent().find('.input-text').val();
    if (val > 1) {
      val = parseInt(val) - 1;
      jQuery(this).parent().find('.input-text').val(val);
    }
    return false;
  });

  jQuery('.quantity .up').on("click", function () {
    var val = jQuery(this).parent().find('.input-text').val();
    val = parseInt(val) + 1;
    jQuery(this).parent().find('.input-text').val(val);
    return false;
  });
});