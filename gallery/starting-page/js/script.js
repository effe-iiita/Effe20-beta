jQuery( document ).ready(function() {
	jQuery('.full-screen-area').pt_full_page();

	jQuery('.pages-slider').owlCarousel({
		loop:true,
		items:1,
		nav: false,
		dots: false,
		autoplay: true,
		autoplayTimeout: 5000,
		navText: false,
		onInitialized: function(event) {
			jQuery(event.target).parents('.pages-slider-area').find('.slider-navigation .line').removeClass('reset').addClass('go');
		},
		onTranslated: function(event) {
			jQuery(event.target).parents('.pages-slider-area').find('.slider-navigation .line').removeClass('reset').addClass('go');
		},
		onTranslate: function(event) {
			jQuery(event.target).parents('.pages-slider-area').find('.slider-navigation .line').removeClass('go').addClass('reset');
		}
	});

	jQuery('.slider-navigation .prev').on('click', function() {
		jQuery(this).parents('.pages-slider-area').find('.pages-slider').trigger('prev.owl.carousel');
	});

	jQuery('.slider-navigation .next').on('click', function() {
		jQuery(this).parents('.pages-slider-area').find('.pages-slider').trigger('next.owl.carousel');
	});

	jQuery('.features-carousel').each(function(){
	    var head_slider = jQuery(this);

	    var swiper = new Swiper(head_slider, {
	        slidesPerView: 3,
	        slidesPerColumn: 3,
	        breakpoints: {
	            1024: {
	                slidesPerView: 3,
	                slidesPerColumn: 3,
	            },
	            768: {
	                slidesPerView: 2,
	                slidesPerColumn: 3,
	            },
	            640: {
	                slidesPerView: 1,
	                slidesPerColumn: 3,
	            },
	            380: {
	                slidesPerView: 1,
	                slidesPerColumn: 3,
	            },
	        },
	        navigation: {
	            nextEl: '.owl-next',
	            prevEl: '.owl-prev',
	        },
	    });
	});

	jQuery(window).on('load resize', function() {
		jQuery('.starting-first-screen').css('height', jQuery(window).height()-jQuery('.ypromo-site-bar').height());
	});

});
