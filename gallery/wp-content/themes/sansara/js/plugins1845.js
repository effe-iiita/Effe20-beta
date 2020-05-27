(function( jQuery ) {
	"use strict";

	jQuery.fn.pt_full_page = function() {
		return this.each(function() {
			var $this = jQuery(this),
				$nav = $this.find('.fc-navigation'),
				$top_title = $this.find('.fc-top-nav .h'),
				$arrows = $this.find('.fc-top-nav .arrows'),
				$items = $this.find('.fc-item'),
				status = false;

			jQuery('body').addClass('body-overflow-hidden');
			$items.each(function(index) {
				jQuery(this).css('z-index', parseInt($items.length-jQuery(this).index()));
				$nav.find('ul').append('<li class="item"><span class="label">'+jQuery(this).data('title')+'</span><span class="label2">'+jQuery(this).data('title')+'</span><span class="num">'+leadZero(index+1)+'</span></li>');
			});

			scroll(false, 0);

			jQuery(window).on('load resize', function() {
				$this.css('height', jQuery(window).outerHeight()-jQuery('.header-space:visible').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());
				$items.find('.cell-container').css({
					'height': $this.height(),
					'width': $this.width(),
				});
				$items.find('.container-fluid').css('width', $this.width());
				$this.find('.fc-navigation .item').css('height', parseInt($this.height()/$items.length));

				if($this.hasClass('navigation-style2')) {
					$this.find('.fc-navigation .item').each(function() {
						jQuery(this).css('height', jQuery(this).find('.label2').width());
					});
				}

				move_nav_line($nav.find('.item.active').index());

				if(jQuery(window) <= 992) {
					$items.addClass('active');
				}
			});

			function move_nav_line(index) {
				if($nav.find('ul').length > 0) {
					var $el = $nav.find('ul .item').eq(index),
						wrap_top = $el.parent('ul').position().top,
						$el_height = $el.outerHeight(true)/2,
						$el_offset = $el.position().top+wrap_top+$el_height-20,
						$line = $nav.find('.current-line');

					$line.css('top', $el_offset);
				}
			}

			function set_title(index) {
				var title = $nav.find('ul .item').eq(index).find('.label').text();

				$top_title.html('<strong>'+leadZero(index+1)+'</strong> <span>'+title+'</span>');
			}

			function scroll(coef, index) {
				index = index === undefined ? false : index;
				if(coef != false) {
					var index = $this.find('.fc-item.active').index()-coef;
				}
				$items.eq(index).removeClass('prev next').addClass('active').siblings().removeClass('active');
				$items.eq(index).prevAll().removeClass('next').addClass('prev');
				$items.eq(index).nextAll().removeClass('prev').addClass('next');

				$nav.find('.item').eq(index).addClass('active').siblings().removeClass('active');
				move_nav_line(index);

				if(index == 0) {
					$arrows.find('.prev').addClass('disabled');
				} else {
					$arrows.find('.prev').removeClass('disabled');
				}

				if(index == $items.length-1) {
					$arrows.find('.next').addClass('disabled');
				} else {
					$arrows.find('.next').removeClass('disabled');
				}

				set_title(index);

				if($items.eq(index).hasClass('starting-split-item')) {
					jQuery('body').addClass('wrap-lines-right-dark');
				} else {
					jQuery('body').removeClass('wrap-lines-right-dark');
				}

				if($items.eq(index).find('.owl-carousel').length > 0) {
					$items.eq(index).find('.owl-carousel').each(function() {
						jQuery(this).trigger('to.owl.carousel', [0, 0]);
					});
				}
			}

			$this.on('mousewheel wheel', function(e) {
				if(jQuery(window).width() > 992) {
					e.preventDefault();
					var cur = $this.find('.fc-item.active').index(),
						delay = 1000;
					if(status != true) {
						status = true;
						if(e.originalEvent.deltaY > 0 && cur != parseInt($items.length-1)) {
							scroll('-1');
							setTimeout(function(){status = false}, delay);
						} else if(e.originalEvent.deltaY < 0 && cur != 0) {
							scroll('1');
							setTimeout(function(){status = false}, delay);
						} else {
							status = false;
						}
					}
				}
			});

			$nav.on('click', '.item', function() {
				scroll(false, jQuery(this).index());
			});

			$arrows.on('click', '.prev', function() {
				scroll('1');
			});

			$arrows.on('click', '.next', function() {
				scroll('-1');
			});
		});
	};


	jQuery.fn.pt_tabs = function() {
		return this.each(function() {
			var $tabs = jQuery(this),
				$tabs_head = $tabs.find('.tabs-head'),
				$tabs_body = $tabs.find('.tabs-body'),
				$tab_content = $tabs.find('.tab-content');

			$tab_content.each(function() {
				$tabs_head.append('<li>'+jQuery(this).data('title')+'</li>');
			});
			
			function set_tab(index) {
				$tabs_head.find('li').eq(index).addClass('current').siblings().removeClass('current');
				$tabs.find('.tab-img div').eq(index).addClass('current').siblings().removeClass('current');
				$tab_content.eq(index).slideDown().siblings().slideUp();

				if($tabs.find('.isotope').length > 0) {
					$tabs.find('.isotope').isotope();
				}
			}

			$tabs_head.on('click', 'li:not(.current)', function() {
				set_tab(jQuery(this).index());
			});

			if($tabs.find('.tab-img').length > 0) {
				$tab_content.each(function() {
					$tabs.find('.tab-img').append('<div style="background-image: url('+jQuery(this).data('img')+')"></div>');
				});

				jQuery(window).on('load resize', function(){
					var $imgs = $tabs.find('.tab-img'),
						offset_left = $tabs.offset().left,
						window_width = jQuery(window).width(),
						tabs_width = $tabs.width();

					if($tabs.parents('.full-screen-area').length > 0) {
						var height = $tabs.parents('.cell').height();
						$imgs.css({
							'width': window_width-offset_left-tabs_width-60,
							'height': height
						});
					} else {
						var height = $tabs.parents('.vc_row').height();
						$imgs.css({
							'width': window_width-offset_left-tabs_width-60,
							'right': -(window_width-offset_left-tabs_width),
							'height': height
						});
					}
				});
			}

			set_tab(0);
		});
	};

	jQuery.fn.pt_vertical_parallax = function() {
		return this.each(function() {
			jQuery('body').addClass('body-overflow-hidden');

			var $this_el = jQuery(this),
				$el = $this_el.find('.vps-item'),
				delay = 800,
				$dots = $this_el.parent().find('.pagination-dots'),
				$nav = $this_el.parent().find('.nav-arrows'),
				status = false;

			$el.each(function(){
				jQuery(this).css('z-index', parseInt($el.length-jQuery(this).index()));
				$dots.append('<span></span>');
			});

			$this_el.find('.vps-item.last').prev().addClass('last-prev');

			jQuery(window).on('load resize', function() {
				$this_el.css('height', jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').height()-jQuery('#wpadminbar').outerHeight());
				//$this_el.find('.vps-item:not(.last)').css('height', $this_el.height());
			});

			function vertical_parallax(coef, index) {
				index = index === undefined ? false : index;
				if(coef != false) {
					var index = $this_el.find('.vps-item.active').index()-coef;
				}
				$el.eq(index).removeClass('prev next').addClass('active').siblings().removeClass('active');
				$el.eq(index).prevAll().removeClass('next').addClass('prev');
				$el.eq(index).nextAll().removeClass('prev').addClass('next');
				$dots.find('span').eq(index).addClass('active').siblings().removeClass('active');
			}

			vertical_parallax(false, 0);

			$this_el.on('mousewheel wheel', function(e) {
				if(jQuery(window).width() > 992) {
					e.preventDefault();
					var cur = $this_el.find('.vps-item.active').index();
					if(status != true) {
						status = true;
						if(e.originalEvent.deltaY > 0 && cur != parseInt($el.length-1)) {
							vertical_parallax('-1');
							setTimeout(function(){status = false}, delay);
						} else if(e.originalEvent.deltaY < 0 && cur != 0) {
							vertical_parallax('1');
							setTimeout(function(){status = false}, delay);
						} else {
							status = false;
						}
					}
				}
			});

			$dots.on('click', 'span:not(.active)', function() {
				jQuery(this).addClass('active').siblings().removeClass('active');
				vertical_parallax(false, jQuery(this).index());
			});

			$nav.on('click', '.prev', function() {
				var cur = $this_el.find('.vps-item.active').index();
				if(cur != parseInt($el.length-1)) {
					vertical_parallax('-1');
				}
			}).on('click', '.next', function() {
				var cur = $this_el.find('.vps-item.active').index();
				if(cur != 0) {
					vertical_parallax('1');
				}
			});
		});
	};
})(jQuery);