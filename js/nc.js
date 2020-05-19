/**
***************************************************************
* AUTHOR : NCodeArt
* PROJECT : Acute Coming Soon Template
* Purchase : http://www.ncodeart.com/
*
* Copyright 2015-2016 NCodeArt
* NOTE : This file licensed to NCodeArt - http://themeforest.net/user/ncodeart and it is strictly prohibited to copy or reuse it.
***************************************************************
*/

/**
*****************************************************************
* This file is licensed to NCodeArt.
* it's not allowed to copy or reuse it Copyright NCodeArt 2015-2016
* NCodeArt : http://www.ncodeart.com/
*****************************************************************
*/

; (function () {
	'use strict';

	var nc = {};
	var package_ver = 'v1.0';

	/*----------  CONFIG  ----------*/
	nc.config = {
		/*
		TWITTER
		String: consumer key. make sure to have your app read-only
		String: consumer secret key. make sure to have your app read-only
		*********************/
		twitter: {
			consumer_key: 'YOUR_CONSUMER_KEY',
			consumer_secret: 'YOUR_CONSUMER_SECRET_KEY'
		},

		/*
		URL OF SUCCESS PAGE ON FORM SUBMIT
		*********************/
		success_url: "thankyou.html"
	}

	/*----------  ELEMENT CHECK  ----------*/
	nc.dmod = false;
	nc.elcheck = function (el) {
		'use strict';
		if ($(el).length > 0) {
			return true;
		} else {
			return false;
		};
	}

	nc.window = $(window);
	
	nc.uid = function () {
		'use strict';
		var uid = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < 3; i++)
			uid += possible.charAt(Math.floor(Math.random() * possible.length));
		return 'rg' + uid;
		//return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
	}

	nc.demo = function () { if (nc.dmod) { return ncNotice(); } else { return true; }; }

	nc.setId = function (obj, prefix, n) {
		'use strict';

		n++;
		var a = prefix + n;
		$(obj).css({ opacity: 0 });
		$(obj).attr("id", a);
		$(obj).addClass(a);

		// Accordion setup
		if ($(obj).is(".accordion-widget")) {
			$(obj).find(".acc-block").each(function (index, el) {
				var id = a + "-acc-block-" + index;
				$(this).find(".acc-hd").attr("data-accid", "#" + id);
				$(this).find(".acc-content").attr("id", id);
				$(this).find(".acc-hd").append('<i class="acc-open ' + $(obj).attr("data-acc-openclass") + ' "></i><i class="acc-close ' + $(obj).attr("data-acc-closeclass") + '"></i>');
			});
		}
	}

	nc.getMultiScripts = function (arr, path) {
		'use strict';

		var _arr = $.map(arr, function (scr) {
			return $.getScript((path || "") + scr);
		});

		_arr.push($.Deferred(function (deferred) {
			$(deferred.resolve);
		}));

		return $.when.apply($, _arr);
	}

	nc.mobmenu = function (el) {
		'use strict';
		
		$(el).on("click", function (e) {
			var nav = $(this).attr('data-nav');
			var c = $(this).attr('data-navclose');
			var o = $(this).attr('data-navopen');
			if ($(nav).hasClass('open')) {
				$(nav).removeClass('open');
				//$(this).find('i').removeClass($(this).attr('data-navclose')).addClass($(this).attr('data-navopen'));
				$(this).find('i').removeClass(c).addClass(o);
			} else {
				$(nav).addClass('open m-nav');
				//$(this).find('i').removeClass($(this).attr('data-navopen')).addClass($(this).attr('data-navclose'));

				$(this).find('i').removeClass(o).addClass(c);
			};
		});

	}

	/*----------  OWL CAROUSEL  ----------*/
	nc.owlitems = function (arr) {
		'use strict';
		if (typeof (arr) == "string" && arr != 'false') {
			var t1 = arr.split('|');
			var t2 = {};
			$.each(t1, function (index, val) {
				var str = val;
				var newarr = str.split(',');
				t2[newarr[0]] = {}
				t2[newarr[0]] = { items: parseInt(newarr[1], 10) };
			});
			return t2;
		} else if (arr === 'false') {
			return {};
		} else {
			return false;
		}
	}

	nc.getvar = function (v, default_v, val_type) {
		'use strict';
		if (val_type == 'n') {
			return v ? parseInt(v, 10) : default_v;
		}
		if (val_type == 'b') {
			if (v == 'true') { return true; }
			else if (v == 'false') { return false; }
			else { return default_v; }
		}
		if (val_type == 's') {
			if (v == 'false') {
				return false;
			} else {
				return v ? v : default_v;
			};

		}
	}

	nc.slider = function (owlObj) {

		'use strict';

		var resObj = {
			0: { items: 1 },
			420: { items: 2 },
			600: { items: 3 },
			768: { items: 3 },
			980: { items: 4 }
		}

		var owlEle = $(owlObj + ' .owl-carousel'),
			o = $(owlObj);

		var config = {
			center: nc.getvar(o.attr('data-center'), false, 'b'),
			stagePadding: nc.getvar(o.attr('data-stpd'), 0, 'n'),
			items: nc.getvar(o.attr('data-items'), 5, 'n'),
			margin: nc.getvar(o.attr('data-margin'), 0, 'n'),
			nav: nc.getvar(o.attr('data-nav'), false, 'b'),
			dots: nc.getvar(o.attr('data-pager'), false, 'b'),
			slideby: nc.getvar(o.attr('data-slideby'), 1, 'n'),
			rbase: nc.getvar(o.attr('data-rbase'), o.parent(), 's'),
			res: o.attr('data-itemrange') ? nc.owlitems(o.attr('data-itemrange')) : resObj,
			animOut: nc.getvar(o.attr('data-out'), 'fadeOut', 's'),
			animIn: nc.getvar(o.attr('data-in'), 'fadeIn', 's'),
			autoplay: nc.getvar(o.attr('data-autoplay'), false, 'b'),
			autoplayTimeout: nc.getvar(o.attr('data-timeout'), 3000, 'n'),
			autoplayHoverPause: nc.getvar(o.attr('data-hstop'), true, 'b'),
			loop: nc.getvar(o.attr('data-loop'), false, 'b'),
			autoWidth: nc.getvar(o.attr('data-awidth'), false, 'b'),
			autoHeight: nc.getvar(o.attr('data-hauto'), true, 'b'),
			touchDrag: nc.getvar(o.attr('data-tdrag'), true, 'b'),
			mouseDrag: nc.getvar(o.attr('data-mdrag'), true, 'b'),
			pullDrag: nc.getvar(o.attr('data-pdrag'), true, 'b'),
			contentHeight: nc.getvar(o.attr('data-h'), true, 'b')
		}
		o.animate({ opacity: 1 }, 300, function () {

			if (owlEle.find(".owl-stage").length === 0) {
				owlEle.owlCarousel({
					center: config.center,
					stagePadding: config.stagePadding,
					items: config.items,
					margin: config.margin,
					nav: config.nav,
					dots: config.dots,
					slideBy: config.slideby,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
					responsiveBaseElement: config.rbase,
					responsive: config.res,
					loop: $(owlObj + " .owl-carousel > .item").length > 1 ? config.loop : false,
					animateOut: config.animOut, //'slideOutDown',
					animateIn: config.animIn, //'flipInX',
					autoplay: config.autoplay,
					autoplayTimeout: config.autoplayTimeout,
					autoplayHoverPause: config.autoplayHoverPause,
					autoHeight: config.autoHeight,
					autoWidth: config.autoWidth,
					touchDrag: config.touchDrag,
					mouseDrag: config.mouseDrag,
					pullDrag: config.pullDrag,
					autoplaySpeed: 2000,

					onInitialized: function () {
						owlEle.animate({ opacity: 1 }, 300);
						
						// Align arrows
						owlEle.find('.owl-nav').css({
							top: owlEle.find('.owl-stage-outer').outerHeight() / 2
						});
						nc.blazyload(owlEle);
					}
				});

				o.find('.carousel-btn .prev').on('click', function () { owlEle.trigger('prev.owl.carousel'); });
				o.find('.carousel-btn .next').on('click', function () { owlEle.trigger('next.owl.carousel'); });
			}
		});
	}

	/*----------  FULL HEIGHT AND WIDTH  ----------*/
	nc.fullwh = function (obj) {
		'use strict';
		// global vars
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		// set initial div height / width
		$(obj).css({
			'width': winWidth,
			'height': winHeight,
		});
	}
	nc.fullh = function (obj, wrp) {
		'use strict';

		if (wrp) {
			var winHeight = $(obj).closest(wrp).height();
		} else {
			var winHeight = $(window).height();
		}

		// set initial div height / width
		$(obj).css({
			'height': winHeight,
		});
	}

	/*----------  SWIPER SLIDER  ----------*/
	nc.swiper_slider = function (obj) {

		'use strict';

		var config = {
			autoplay: nc.getvar($(obj).attr('data-autoplay'), 1000, 'n'),
			speed: nc.getvar($(obj).attr('data-speed'), 1000, 'n'),
			fullsize: nc.getvar($(obj).attr('data-fullsize'), false, 'b'),
		}

		if (config.fullsize) {
			nc.fullwh(obj);
			$(window).resize(function () {
				nc.fullwh(obj);
			});
		};

		var swiper = new Swiper(obj, {

			direction: 'horizontal',
			touchEventsTarget: 'container',
			speed: config.speed,
			autoplay: config.autoplay,
			autoplayDisableOnInteraction: true,
			effect: 'fade', // 'slide' or 'fade' or 'cube' or 'coverflow'
			parallax: false,
			pagination: obj + ' .swiper-pagination',
			paginationClickable: true,
			nextButton: obj + ' .swiper-button-next',
			prevButton: obj + ' .swiper-button-prev',
			onInit: function (swiper) {
				$(obj).animate({ opacity: 1 }, 300);
			}
		});
	}

	nc.swiper_gallery = function (obj) {
		'use strict';

		var galleryTop = new Swiper(obj + ' .gallery-top', {
			nextButton: obj + ' .swiper-button-next',
			prevButton: obj + ' .swiper-button-prev',
			spaceBetween: 0,
			onInit: function (swiper) {
				$(obj).animate({ opacity: 1 }, 300);
			},
			preloadImages: false,
			lazyLoading: true
		});
		var galleryThumbs = new Swiper(obj + ' .gallery-thumbs', {
			spaceBetween: 10,
			centeredSlides: true,
			slidesPerView: 'auto',
			touchRatio: 0.2,
			slideToClickedSlide: true,
			preloadImages: false,
			lazyLoading: true
		});
		galleryTop.params.control = galleryThumbs;
		galleryThumbs.params.control = galleryTop;
	}

	/*----------  TABS  ----------*/
	nc.tabs = function (obj) {
		'use strict';

		if ($(obj.tb).hasClass('tabs-auto')) {
			var t = 0,
				tb_activeClass = $(obj.tb).attr('data-tb-active') ? 'active '+$(obj.tb).attr('data-tb-active') : 'active',
				pn_activeClass = $(obj.tb).attr('data-pn-active') ? 'active '+$(obj.tb).attr('data-pn-active') : 'active';

			$(obj.tb).find('.tb-list > .tb').each(function () {
				var tb = obj.count + '-tb-' + t;
				$(this).attr("data-tb", '#' + tb);
				$(obj.tb).find('.tb-content > .tb-pn:eq(' + t + ')').attr("id", tb);
				t++;
			});

			$(obj.tb).on('click', '.tb-list > .tb', function (e) {
				e.preventDefault();

				$(this).closest('.tb-list').find('.tb').removeClass(tb_activeClass);
				$(this).addClass(tb_activeClass);

				var target = $($(this).attr('data-tb'));
				target.siblings('.tb-pn').removeClass(pn_activeClass);
				target.addClass(pn_activeClass);

			});
			if ($(obj.tb).find('.tb-list > .tb').hasClass(tb_activeClass)) {
				$(obj.tb).find('.tb-list > .tb.active').click();
			} else {
				$(obj.tb).find('.tb-list > .tb:first').click();
			};

		} else {

			$('[data-tb]').each(function (index, el) {
				var target = $(this).attr('data-tb');
				$(target).addClass('tab-pn');
			});
			$(obj).on('click', function (e) {
				e.preventDefault();

				var	tb_activeClass = $(obj).attr('data-tb-active') ? 'active '+$(obj).attr('data-tb-active') : 'active',
					pn_activeClass = $(obj).attr('data-pn-active') ? 'active '+$(obj).attr('data-pn-active') : 'active',
					tb_normalClass = $(obj).attr('data-tb-normal') ? $(obj).attr('data-tb-normal') : '',
					pn_normalClass = $(obj).attr('data-pn-normal') ? $(obj).attr('data-pn-normal') : '';

				$(obj).closest('.tab-widget').find('[data-tb]').addClass(tb_normalClass).removeClass(tb_activeClass);
				$(this).removeClass(tb_normalClass).addClass(tb_activeClass);

				var target = $($(this).attr('data-tb'));
				nc.animationOut(".tab-pn");
				target.siblings('.tab-pn').addClass(tb_normalClass).removeClass(pn_activeClass);
				target.removeClass(tb_normalClass).addClass(pn_activeClass);
				nc.ncBgEffect();

				nc.animationIn(".tab-pn.active");

			}).eq(0).click();
		};

	}

	/*----------  ACCORDION  ----------*/
	nc.accordion = function (obj) {
		'use strict';

		function close_acc(parent_obj) {
			$(parent_obj).find('.acc-hd').removeClass('active');
			$(parent_obj).find('.acc-content').stop().slideUp(200).removeClass('open');
		}

		$(obj).animate({ opacity: 1 }, 500, function () { });

		$(obj).on('click', '.acc-hd', function (e) {
			e.stopPropagation();
			e.preventDefault();

			var content = $(this).attr('data-accid');
			if ($(this).is('.active')) {
				close_acc(obj);
			} else {
				close_acc(obj);

				// Add active class to section title
				$(this).addClass('active');
				// Open up the hidden content panel
				$(obj).find(content).stop().slideDown(200).addClass('open');
			}

		});

		// First open option
		if ($(obj).attr("data-acc-firstopen") == 'y') {
			$(obj).find(".acc-block:first .acc-hd").click();
		} else {
			close_acc(obj);
		}

	}

	/*----------  FORM VALIDATION  ----------*/
	nc.global_validation = {
		form: '',
		rules: {
			email: { required: true, email: true },
			name: { required: true },
			message: { required: true },
			phone: { required: true, number: true },
			date: { required: true, date: true },
			datetime: { required: true, date: true },
			people: { required: true, number: true }
		},
		msgpos: 'normal',
		msg: {
			email: { email: "Please, enter a valid email" }
		},
		subscribe_successMsg: "You are in list. We will inform you as soon as we finish.",
		form_successMsg: "Thank you for contact us. We will contact you as soon as possible.",

		successMsg: "",
		errorMsg: "Oops! Looks like something went wrong. Please try again later."
	}

	nc.formVaidate = function (obj) {
		'use strict';
		var msgpos = $(obj.form).attr('data-msgpos') ? $(obj.form).attr('data-msgpos') : 'normal';
		if (msgpos == 'append') {
			$(obj.form).validate({
				onfocusout: false,
				onkeyup: false,
				rules: obj.rules,
				messages: obj.msg,
				highlight: false,
				errorPlacement: function (error, element) {
					if (msgpos == 'append') {
						error.appendTo(element.closest("form").find('.msg-wrp'));
					};
				},
				success: function (element) {
					element.remove();
				}
			});
		} else {
			$(obj.form).validate({
				onfocusout: false,
				onkeyup: false,
				rules: obj.rules,
				messages: obj.msg,
				highlight: false,
				success: function (element) {
					element.remove();
				}
			});
		};
	}

	nc.resetForm = function (form) {
		'use strict';
		$(form).find('input[type="text"], input[type="email"], textarea').val(null);
	}

	nc.contactForm = function ($form, formData, validate_data) {
		'use strict';

		if ($form.find('label.error').length > 0) { $form.find('label.error').hide(); }

		var $btn = $form.find(".btn").button('loading');
		var timer = 4000;

		if ($form.valid()) {
			$.ajax({
				url: $form.attr('action'),
				type: 'POST',
				data: formData,
				success: function (data) {
					if (data.status == 'error') {
						// Email subscription error messages
						swal("Error!", data.type, "error");
						$btn.button('reset');
						nc.resetForm($form);
					} else {
						//swal("Success!", validate_data.successMsg, "success");
						swal({
							type: "success",
							title: "Success!",
							text: validate_data.successMsg,
							timer: timer
						}, function () {
							if ($form.attr('data-success-redirect') === 'y') {
								window.location = nc.config.success_url;
							}
						});

						$btn.button('reset');
						$.magnificPopup.close();
						nc.resetForm($form);

						setTimeout(function () { swal.close(); }, timer);
					};
				},
				error: function () {
					swal("Error!", validate_data.errorMsg, "error");
					$btn.button('reset');
					$.magnificPopup.close();
					setTimeout(function () { swal.close(); }, timer);
				}
			});
		} else {
			$form.find("label.error").delay(timer).fadeOut('400', function () {
				$(this).remove();
			});
			$btn.button('reset');
		};
	}

	nc.formWidget = function (obj) {
		'use strict';

		var config = {
			popup_selector: $(obj).attr('data-popup') ? '.' + $(obj).attr('data-popup') : false,
			form_type: $(obj).attr('data-formtype') ? $(obj).attr('data-formtype') : 'normal',
			form_selector: obj
		}

		var $form = $(config.form_selector);

		// Validation rules
		nc.global_validation.form = config.form_selector;
		var validate_data = nc.global_validation;

		// Pop up form
		if (config.popup_selector) {
			$(config.popup_selector).each(function (index, el) {
				$(this).magnificPopup({
					type: 'inline',
					preloader: false
				});
			});
		};

		// Date and time picker options
		if ($form.find(".date-pick").length > 0 || $form.find(".datetime-pick").length > 0) {

			var date_script_arr = [
				/*
				http://www.malot.fr/bootstrap-datetimepicker/index.php
				https://github.com/smalot/bootstrap-datetimepicker
				*/
				"lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"
			];

			nc.getMultiScripts(date_script_arr, '').done(function () {
				// Date picker
				if ($form.find(".date-pick").length > 0) {
					$form.find(".date-pick").each(function (index, el) {
						$(this).datetimepicker({
							autoclose: true,
							startView: 2,
							minView: 2
						});
					});
				};

				// Date time picker
				if ($form.find(".datetime-pick").length > 0) {
					$form.find(".datetime-pick").each(function (index, el) {
						$(this).datetimepicker({
							autoclose: true
						});
					});
				};
			});
		}
		

		// Form validation
		nc.formVaidate(validate_data);

		// Form
		$form.find('button').off('click').on('click', function (e) {
			e.preventDefault();
			if (config.form_type == "newsletter") {
				nc.global_validation.successMsg = nc.global_validation.subscribe_successMsg;
			} else {
				nc.global_validation.successMsg = nc.global_validation.form_successMsg;
			};

			nc.contactForm($form, $form.serializeObject(), validate_data);
			return false;
		});
	}

	$.fn.serializeObject = function () {
		'use strict';

		var o = {};
		var a = this.serializeArray();
		$.each(a, function () {

			// Field labels
			var field_label = $('[name=' + this.name + ']').attr('data-label') ? $('[name=' + this.name + ']').attr('data-label') : this.name;

			// Field values
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push({ val: this.value, label: field_label } || '');
			} else {
				//o[this.name] = this.value || '';
				o[this.name] = { val: this.value, label: field_label } || '';
			}
		});
		return o;
	};

	/*----------  VIDEO BACKGROUND  ----------*/
	nc.videoBg = function (obj, imglist) {
		'use strict';
		var isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function () {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function () {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function () {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function () {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

		if (isMobile.any()) {
			$(obj).css("display", "none");
			/*$(obj).vegas({
				slides: [
					{ src: "images/bg-1.jpg" },
					{ src: "images/bg-2.jpg" },
					{ src: "images/bg-3.jpg" },
					{ src: "images/bg-4.jpg" }
				]
				slides: imglist
			});*/
		}
		else {
			$(obj).css("display", "block");
			$(obj).YTPlayer({
				onReady: function (player) { }
			});
		}
	}

	/*----------  POPUP  ----------*/
	nc.videoPopup = function (obj) {
		'use strict';
		$(obj).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	};

	nc.inlinePopup = function (obj) {
		'use strict';
		$('body').off('click').on('click', obj, function (e) {
			$(this).magnificPopup({
				type: 'inline',
				preloader: false
			}).click();
		});
	}

	/*----------  SLIDESHOW  ----------*/
	nc.bgSlider = function (setting) {
		'use strict';
		setTimeout(function () {
			$(setting.obj).vegas({
				delay: setting.delay,
				slides: setting.slides,
				animation: setting.effect
			});
		}, 1000);

	}

	/*----------  LINKSCROLL  ----------*/
	nc.linkscroll = function (obj) {
		'use strict';
		$(document).on('click', obj, function (e) {
			e.preventDefault();
			if ($(this).closest('.nav-links').hasClass('nav-links') == false && $(this).attr('href').indexOf("popup") === -1) {
				// target element id
				var id = $(this).attr('href');
				// target element
				var $id = $(id);
				if ($id.length === 0) { return; }
				// top position relative to the document
				var pos = $(id).offset().top;
				// animated top scrolling
				$('body, html').animate({ scrollTop: pos }, 1200);
			};
		});
	}

	/*----------  COUNTDOWN  ----------*/
	nc.countdown = function (obj) {
		'use strict';

		var o = $(obj);
		var config = {
			day: parseInt(o.attr("data-day"), 10),
			month: parseInt(o.attr("data-month"), 10),
			year: parseInt(o.attr("data-year"), 10),
			hour: parseInt(o.attr("data-hr"), 10),
			min: parseInt(o.attr("data-min"), 10),
			sec: parseInt(o.attr("data-sec"), 10)
		}

		var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		var firstDate = new Date(config.year, config.month - 1, config.day - 1);
		var d = new Date();
		var secondDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

		var countdownHtml = '<div class="inner-dashboard">';
		countdownHtml += '	<!-- DAYS -->';
		countdownHtml += '	<div class="dash days_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += diffDays > 99 ? '<div class="digit">0</div>' : '';
		//countdownHtml += '<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">days</span>';
		countdownHtml += '	</div>';
		countdownHtml += '	<!-- HOURS -->';
		countdownHtml += '	<div class="dash hours_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">hours</span>';
		countdownHtml += '	</div>';
		countdownHtml += '	<!-- MINIUTES -->';
		countdownHtml += '	<div class="dash minutes_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">minutes</span>';
		countdownHtml += '	</div>';
		countdownHtml += '	<!-- SECONDS -->';
		countdownHtml += '	<div class="dash seconds_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">seconds</span>';
		countdownHtml += '	</div>';
		countdownHtml += '</div>';

		o.html(countdownHtml);

		// DESKTOP CLOCK
		o.countDown({
			targetDate: {
				'day': config.day,
				'month': config.month,
				'year': config.year,
				'hour': config.hour,
				'min': config.min,
				'sec': config.sec
			},
			omitWeeks: true
		});
	}

	/*----------  INSTA  ----------*/
	nc.instagram = function (obj) {
		'use strict';

		var o = $(obj),
			id = o.attr('id');
		o.find('.feed-data').socialfeed({
			instagram: {
				accounts: ['*'],
				limit: o.attr('data-insta-limit') ? o.attr('data-insta-limit') : 8,
				userdata: o.attr('data-insta-user') ? o.attr('data-insta-user') : '',
				client_id: nc.config.instagram.client_id,
				access_token: nc.config.instagram.access_token,
				tpl_class: o.attr('data-insta-tplclass') ? o.attr('data-insta-tplclass') : '',
			},

			// GENERAL SETTINGS
			template: 'lib/social-feed/' + o.attr('data-insta-tpl') + '.html',
			length: o.attr('data-insta-length') ? parseInt(o.attr('data-insta-length'), 10) : 256,
			show_media: true,
			update_period: false,

			callback: function () {
				o.animate({ opacity: 1 }, 500, function () {
					if (nc.elcheck('#' + id + ' .instagram-carousel')) {
						nc.slider('#' + id + ' .instagram-carousel');
					}
				});
			}
		});
	}

	/*----------  TWITTER  ----------*/
	nc.twitter = function (obj) {
		'use strict';

		var o = $(obj),
			id = o.attr('id');
		o.find('.feed-data').socialfeed({
			twitter: {
				accounts: ['@' + o.attr('data-twitter-user')],
				limit: o.attr('data-twitter-limit') ? o.attr('data-twitter-limit') : 6,
				consumer_key: nc.config.twitter.consumer_key,
				consumer_secret: nc.config.twitter.consumer_secret,
				tpl_class: o.attr('data-twitter-tplclass') ? o.attr('data-twitter-tplclass') : '',
				tpl_class1: o.attr('data-twitter-tplclass1') ? o.attr('data-twitter-tplclass1') : '',
				tpl_class2: o.attr('data-twitter-tplclass2') ? o.attr('data-twitter-tplclass2') : '',
				tpl_class3: o.attr('data-twitter-tplclass3') ? o.attr('data-twitter-tplclass3') : '',
				tpl_class4: o.attr('data-twitter-tplclass4') ? o.attr('data-twitter-tplclass4') : ''
			},

			// GENERAL SETTINGS
			template: 'lib/social-feed/' + o.attr('data-twitter-tpl') + '.html',
			length: o.attr('data-twitter-length') ? parseInt(o.attr('data-twitter-length'), 10) : 256,
			show_media: true,
			update_period: false,

			callback: function () {
				o.animate({ opacity: 1 }, 500, function () {
					if (nc.elcheck('#' + id + ' .twitter-carousel')) {
						nc.slider('#' + id + ' .twitter-carousel');
					}
				});
			}
		});
	}

	/*----------  FILTER  ----------*/
	nc.filter = function (obj) {
		'use strict';

		$(obj).animate({ opacity: 1 }, 500, function () { });
		var filterObj = $(obj);
		var container = filterObj.find('.filter-container');
		var list = filterObj.find('.filter-list');
		var time = 500;

		list.find('[data-filter]').on('click', function (event) {
			event.preventDefault();

			var filter = $(this).attr("data-filter");

			list.find("[data-filter]").removeClass('active');
			$(this).addClass('active');

			container.find('.filter-content').stop().animate({ opacity: 0 }, 150, function () {
				$(this).hide();
				if (filter == 'all') {
					container.find('.filter-content').show().stop().animate({ opacity: 1 }, time);
				} else {
					$(filter).show().stop().animate({ opacity: 1 }, time);
				}
			});

		});

		list.find('.active') ? list.find('.active').trigger('click') : list.find('[data-filter]').first().trigger('click');
	}

	/*----------  GOOGLE MAP  ----------*/
	nc.gmapset = function (obj) {
		'use strict';

		var o = $(obj);
		o.css({ height: o.attr("data-map-height") });
		o.animate({ opacity: 1 }, 500, function () {
			o.mapit({
				latitude: o.attr("data-map-latitude"),
				longitude: o.attr("data-map-longitude"),
				zoom: 16,
				type: 'ROADMAP',
				scrollwheel: false,
				marker: {
					latitude: o.attr("data-map-latitude"),
					longitude: o.attr("data-map-longitude"),
					icon: 'images/gmap-marker.png',
					title: o.attr("data-map-markerhd"),
					open: false,
					center: true
				},
				address: o.attr("data-map-markerhtml"),
				styles: o.attr("data-map-styles") ? 'GRAYSCALE' : false //'GRAYSCALE',
			});
		});

	}

	/*----------  SELF HOST VIDEO  ----------*/
	nc.vide = function (obj) {
		'use strict';

		var videofile = $(obj).attr("data-vide-src");
		$(obj).animate({ opacity: 1 }, 500, function () { });
		$(obj).vide({
			mp4: videofile,
			webm: videofile,
			ogv: videofile,
			poster: videofile + ".jpg"
		}, {
				volume: 1,
				playbackRate: 1,
				muted: true,
				loop: true,
				autoplay: true,
				position: 'center center', // Similar to the CSS `background-position` property.
				posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
				resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
				bgColor: 'transparent', // Allow custom background-color for Vide div,
				className: '' // Add custom CSS class to Vide div
			});
	}

	nc.blazyload = function (obj){
		'use strict';

		var bLazy = new Blazy({
			loadInvisible: true,
			success: function(ele){
				if ($(obj).hasClass('owl-carousel')) {
					$(obj).find('.owl-nav').css({
						top: $(obj).find('.owl-stage-outer').outerHeight() / 2
					});
				}
			}
	    });
	}

	/*----------  ANIMATION OUT  ----------*/
	nc.animationOut = function(obj) {
		'use strict';

		var newO = $(obj+" .animated");

		for (var i = 0; i < newO.length; i++) {
			var animateobj = $(newO[i]), 
				animateOut = animateobj.attr('data-animOut'),
				animateIn = animateobj.attr('data-animIn');

			if (animateOut || animateIn) {
				if (animateOut){
					var animatearrout = animateOut.indexOf('|') > -1 ? animateOut.split('|') : animateOut,
					animateclassout = typeof animatearrout == 'object' ? animatearrout[0] : animatearrout,
					animatedelayout = typeof animatearrout == 'object' ? animatearrout[1] : 0;
				}
				if (animateIn){
					var	animatearrin = animateIn.indexOf('|') > -1 ? animateIn.split('|') : animateIn,
					animateclassin = typeof animatearrin == 'object' ? animatearrin[0] : animatearrin,
					animatedelayin = typeof animatearrin == 'object' ? animatearrin[1] : 0;
				}

				
				animateobj.css({
					'-webkit-animation-delay' : animatedelayout+'s',
					'animation-delay' : animatedelayout+'s'
				});
				
				animateobj.removeClass(animateclassout).removeClass(animateclassin).addClass(animateclassout);
			}

		}
	}

	/*----------  ANIMATION IN  ----------*/
	nc.animationIn = function(obj) {
		'use strict';

		var newO = $(obj+" .animated");
		
		for (var i = 0; i < newO.length; i++) {
			var animateobj = $(newO[i]), 
				animateOut = animateobj.attr('data-animOut'),
				animateIn = animateobj.attr('data-animIn');
			
			if (animateOut || animateIn) {
				if(animateOut){
					var animatearrout = animateOut.indexOf('|') > -1 ? animateOut.split('|') : animateOut,
					animateclassout = typeof animatearrout == 'object' ? animatearrout[0] : animatearrout,
					animatedelayout = typeof animatearrout == 'object' ? animatearrout[1] : 0;	
				}

				if(animateIn){
					var	animatearrin = animateIn.indexOf('|') > -1 ? animateIn.split('|') : animatearrouteIn,
					animateclassin = typeof animatearrin == 'object' ? animatearrin[0] : animatearrin,
					animatedelayin = typeof animatearrin == 'object' ? animatearrin[1] : 0;	
				}

				animateobj.css({
					'-webkit-animation-delay' : animatedelayin+'s',
					'animation-delay' : animatedelayin+'s'
				});
				
				animateobj.removeClass(animateclassin).removeClass(animateclassout).addClass(animateclassin);
			}

		}
	}

	/*----------  BG-EFFECT  ----------*/
	nc.ncBgEffect = function(obj) {
		'use strict';

		if ($(".nc-bgeffect").length > 0) {
			var bgheight = $(".ncsection.active").height();
			$(".nc-bgeffect").css("height",bgheight);			
		}
	}
	

	nc.init = function() {
		'use strict';

		var $o = {};
		$o.r = !nc.demo ? false : nc.demo();
		$o.tooltip = $o.r ? $('[data-toggle="tooltip"]') : false;
		$o.navwrp = $('.navigation').length > 0 && $o.r ? $('.navigation') : false;
		$o.fullwh = $("[data-fullwh='y']").length > 0 && $o.r ? $("[data-fullwh='y']") : false;
		$o.fullh = $("[data-fullh='y']").length > 0 && $o.r ? $("[data-fullh='y']") : false;
		$o.bg = $("[data-bg]").length > 0 && $o.r ? $("[data-bg]") : false;
		$o.shadow = $("[data-shadow]").length > 0 && $o.r ? $("[data-shadow]") : false;
		$o.hoverclass = $("[data-hover-class]").length > 0 && $o.r ? $("[data-hover-class]") : false;
		$o.bgcolor = $("[data-bgcolor]").length > 0 && $o.r ? $("[data-bgcolor]") : false;
		$o.txtcolor = $("[data-txtcolor]").length > 0 && $o.r ? $("[data-txtcolor]") : false;
		$o.gradient = $("[data-gradient]").length > 0 && $o.r ? $("[data-gradient]") : false;
		$o.rgradient = $("[data-rgradient]").length > 0 && $o.r ? $("[data-rgradient]") : false;
		$o.videopop = $(".video-popup").length > 0 && $o.r ? $(".video-popup") : false;
		$o.setpop = $(".set-popup").length > 0 && $o.r ? $(".set-popup") : false;
		$o.countbox = $(".count-box").length > 0 && $o.r ? $(".count-box") : false;
		$o.tabwidget = $(".tab-widget").length > 0 && $o.r ? $(".tab-widget") : false;
		$o.tabsauto = $(".tabs-auto").length > 0 && $o.r ? $(".tabs-auto") : false;
		$o.carouselwidget = $(".carousel-widget").length > 0 && $o.r ? $(".carousel-widget") : false;
		$o.accordionwidget = $(".accordion-widget").length > 0 && $o.r ? $(".accordion-widget") : false;
		$o.swiperwidget = $(".swiper-widget").length > 0 && $o.r ? $(".swiper-widget") : false;
		$o.swipergallery = $(".swiper-gallery").length > 0 && $o.r ? $(".swiper-gallery") : false;
		$o.videobg = $(".videobg").length > 0 && $o.r ? $(".videobg") : false;
		$o.videwidget = $(".vide-widget").length > 0 && $o.r ? $(".vide-widget") : false;
		$o.othersection1 = $(".other-section-1").length > 0 && $o.r ? $(".other-section-1") : false;
		$o.popgallerywidget = $(".popgallery-widget").length > 0 && $o.r ? $(".popgallery-widget") : false;
		$o.bgslider = $("[data-bgslider]").length > 0 && $o.r ? $("[data-bgslider]") : false;
		$o.kbgslider = $("[data-kbgslider]").length > 0 && $o.r ? $("[data-kbgslider]") : false;
		$o.countdownwidget = $(".countdown-widget").length > 0 && $o.r ? $(".countdown-widget") : false;
		$o.filterwidget = $(".filter-widget").length > 0 && $o.r ? $(".filter-widget") : false;
		$o.gmapwidget = $(".gmap-widget").length > 0 && $o.r ? $(".gmap-widget") : false;
		$o.socialsection = $(".social-section").length > 0 && $o.r ? $(".social-section") : false;
		$o.instagramwidget = $(".instagram-widget").length > 0 && $o.r ? $(".instagram-widget") : false;
		$o.twitterwidget = $(".twitter-widget").length > 0 && $o.r ? $(".twitter-widget") : false;
		$o.formwidget = $(".form-widget").length > 0 && $o.r ? $(".form-widget") : false;
		$o.stellar = $("[data-stellar]").length > 0 && $o.r ? $("[data-stellar]") : false;
		$o.elanimate = $("[data-animate-in]").length > 0 && $o.r ? $("[data-animate-in]") : false;
		$o.bLazy = $(".b-lazy").length > 0 && $o.r ? $(".b-lazy") : false;
		$o.masonry = $("[data-masonry]").length > 0 && $o.r ? $("[data-masonry]") : false;
		$o.ncbgeffect = $(".nc-bgeffect").length > 0 && $o.r ? $(".nc-bgeffect") : false;

		$o.styleid = $("[data-style-id]").length > 0 && $o.r ? $("[data-style-id]") : false;


		/*----------  LINK SCROLL  ----------*/
		if (nc.elcheck("#page[data-linkscroll='y']")) {
			nc.linkscroll('a[href^="#"]:not(.nav-links)');
		};

		/*----------  NAVIGATION UTILITIES  ----------*/
		if ($o.navwrp) {
			
			if($("html").hasClass('mobile')){
				var menuButton = $(".menu-icon"); 
				menuButton.on("click", function(){
					$(menuButton).toggleClass("open");
					$(".navigation--ul").slideToggle("fast");
				});

				var navLink = $(".navigation--ul a");
				navLink.on("click", function(){
					$(menuButton).removeClass("open");
					$(".navigation--ul").slideUp("fast");
				});
			}
		}

		/*----------  BANNER GRIDS  ----------*/
		if ($o.masonry) {
			for (var i = 0; i < $o.masonry.length; i++) {
				
				var gridGt = $($o.masonry[i]).attr("data-grid-gutter") ? $($o.masonry[i]).attr("data-grid-gutter")+"px" : "10px",
					gridCls = $($o.masonry[i]).attr("data-grid-item") ? $($o.masonry[i]).attr("data-grid-item") : '.masonry-item';
				$($o.masonry[i]).responsivegrid({
					'gutter' : gridGt,
					'itemSelector' : gridCls,
					'breakpoints': {
						'desktop' : {
							'range' : '1200-',
							'options' : {
								'column' : 12,
							}
						},
						'tablet-landscape' : {
							'range' : '980-1200',
							'options' : {
								'column' : 12,
							}
						},
						'tablet-portrate' : {
							'range' : '767-980',
							'options' : {
								'column' : 6,
							}
						},
						'mobile' : {
							'range' : '-767',
							'options' : {
								'column' : 6,
							}
						},
					}
				});
			}
		}
			

		/* Apply ID on each sections
		********************************************/
		if (nc.elcheck(".main-container section")) {
			$(".main-container section").each(function (index, el) {
				$(this).attr('id', nc.uid());
			});
		}

		/*----------  FULL HEIGHT AND WIDTH  ----------*/
		if ($o.fullwh) {
			for (var i = 0; i < $o.fullwh.length; i++) {
				nc.fullwh($o.fullwh[i]);
				var fullwhSection = $o.fullwh[i];
				$(window).resize(function () {
					nc.fullwh(fullwhSection);
				});
			}
		}
		if ($o.fullh) {
			for (var i = 0; i < $o.fullh.length; i++) {
				if ($($o.fullh[i]).attr('data-fullh-wrp')) {
					nc.fullh($o.fullh[i], $($o.fullh[i]).attr('data-fullh-wrp'));

					$(window).resize(function () {
						nc.fullh($o.fullh[i], $($o.fullh[i]).attr('data-fullh-wrp'));
					});
				} else {
					nc.fullh($o.fullh[i]);

					$(window).resize(function () {
						nc.fullh($o.fullh[i]);
					});
				}

			}
		}

		/*----------  SHADOW  ----------*/
		if ($o.shadow) {
			for (var i = 0; i < $o.shadow.length; i++) {
				console.log("yes");
				$($o.shadow[i]).css({ boxShadow: $($o.shadow[i]).attr("data-shadow") });
			}
		}

		/*----------  BACKGROUND  ----------*/
		if ($o.bg) {
			for (var i = 0; i < $o.bg.length; i++) {
				$($o.bg[i]).css({ backgroundImage: "url(" + $($o.bg[i]).attr("data-bg") + ")" });
			}
		}
		if ($o.bgcolor) {
			for (var i = 0; i < $o.bgcolor.length; i++) {
				$($o.bgcolor[i]).css({ backgroundColor: $($o.bgcolor[i]).attr("data-bgcolor") });
			}
		}
		if ($o.txtcolor) {
			for (var i = 0; i < $o.txtcolor.length; i++) {
				$($o.txtcolor[i]).css({ color: $($o.txtcolor[i]).attr("data-txtcolor") });
			}
		}
		if ($o.hoverclass) {
			for (var i = 0; i < $o.hoverclass.length; i++) {
				var hov_class = $($o.hoverclass[i]).attr('data-hover-class');
				$($o.hoverclass[i]).hover(
					function() {
						$(this).addClass(hov_class);
					}, function() {
						$(this).removeClass(hov_class);
					}
				);
			}
		}
		if ($o.gradient) {
			for (var i = 0; i < $o.gradient.length; i++) {
				$o.gradient[i]

				var grd_colors = $($o.gradient[i]).attr('data-g-colors'),
					grd_to = $($o.gradient[i]).attr('data-gradient'),
					grd_color = grd_colors.split('|');

				if (grd_to == 'y') {
					$($o.gradient[i]).css({
						//background: grd_color[0],
						//background: "-moz-linear-gradient(top, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						//background: "-webkit-linear-gradient(top, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						background: "linear-gradient(to bottom, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						//filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + grd_color[0] + "', endColorstr='" + grd_color[1] + "',GradientType=0 )"
					});
				} 
				else {
					$($o.gradient[i]).css({
						//background: grd_color[0],
						//background: "-moz-linear-gradient(top, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						//background: "-webkit-linear-gradient(top, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						background: "linear-gradient(to right, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						//filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + grd_color[0] + "', endColorstr='" + grd_color[1] + "',GradientType=0 )"
					});
				}
			}
		}

		if ($o.rgradient) {
			for (var i = 0; i < $o.rgradient.length; i++) {
				$o.rgradient[i]

				var rgrd_colors = $($o.rgradient[i]).attr('data-rg-colors'),
					rgrd_to = $($o.rgradient[i]).attr('data-rgradient'),
					rgrd_color = rgrd_colors.split('|');

				if (rgrd_to == 'y') {
					$($o.rgradient[i]).css({
						//background: grd_color[0],
						//background: "-moz-linear-gradient(top, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						//background: "-webkit-linear-gradient(top, " + grd_color[0] + " 0%, " + grd_color[1] + " 100%)",
						background: "radial-gradient(ellipse at center, " + rgrd_color[0] + " 0%, " + rgrd_color[1] + " 100%)",
						//filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + grd_color[0] + "', endColorstr='" + grd_color[1] + "',GradientType=0 )"
					});
				} 
			}
		}

		/*----------  PARALLAX  ----------*/
		if ($o.stellar) {

			for (var i = 0; i < $o.stellar.length; i++) {
				$($o.stellar[i]).parent().css({ overflow: 'hidden' });
			}
			
			/*
			data-stellar-horizontal-offset="40"
 			data-stellar-vertical-offset="150"*/
			$.stellar({
				positionProperty: 'transform',
				horizontalScrolling: false,
				hideDistantElements: false
			});
		}
		
		/*----------  ANIMATION  ----------*/
		if ($o.elanimate) {
			for (var i = 0; i < $o.elanimate.length; i++) {

				var animateobj = $($o.elanimate[i]),
					animatein = animateobj.attr('data-animate-in'),
					animatearr = animatein.indexOf('|') > -1 ? animatein.split('|') : animatein,
					animateclass = typeof animatearr == 'object' ? animatearr[0] : animatearr,
					animatedelay = typeof animatearr == 'object' ? animatearr[1] : 0;

				animateobj.css({
					'-webkit-animation-delay': animatedelay + 's',
					'animation-delay': animatedelay + 's'
				});

				animateobj.viewportChecker({
					classToAdd: 'animated ' + animateclass,
					offset: 100
				});
			}
		}

		/*----------  POPUP  ----------*/
		if ($o.videopop) {
			for (var i = 0; i < $o.videopop.length; i++) {
				nc.videoPopup($o.videopop[i]);
			}
		}

		/*----------  NORMAL POPUP  ----------*/
		if ($o.setpop) {
			for (var i = 0; i < $o.setpop.length; i++) {
				$o.setpop[i]

				var pop = $($o.setpop[i]).attr('href');
				$($o.setpop[i]).magnificPopup({
					type: 'inline',
					preloader: false,
					callbacks: {
						beforeOpen: function () {
							$(pop).removeClass('animate fadeInDown').addClass('animate fadeInDown');
						}
					}
				});
			}
		}

		/*----------  COUNTBOX  ----------*/
		if ($o.countbox) {
			var counterup_script_arr = [
				"//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js",
				"lib/counter-up/jquery.counterup.min.js"
			];

			nc.getMultiScripts(counterup_script_arr, '').done(function () {
				$o.countbox.find('.count').counterUp();
			});
			
			//$('.count-box .count').counterUp();
		};

		/*----------  TAB  ----------*/
		if ($o.tabwidget) {
			for (var i = 0; i < $o.tabwidget.length; i++) {
				nc.tabs($($o.tabwidget[i]).find('[data-tb]'));
			}
		}

		if ($o.tabsauto) {
			for (var i = 0; i < $o.tabsauto.length; i++) {
				var tabObj = {
					count: i,
					tb: $o.tabsauto[i]
				}
				nc.tabs(tabObj);
			}
		}

		/*----------  CAROUSEL  ----------*/
		if ($o.carouselwidget) {
			for (var i = 0; i < $o.carouselwidget.length; i++) {
				// SET ID ON ALL OBJECTS
				var owlObj = 'owl' + i;
				$($o.carouselwidget[i]).css({ opacity: 0 }).attr("id", owlObj).addClass(owlObj);
				nc.slider("#" + owlObj);
			}
		}

		/*----------  ACCORDION  ----------*/
		if ($o.accordionwidget) {
			for (var i = 0; i < $o.accordionwidget.length; i++) {
				// SET ID ON ALL OBJECTS
				nc.setId($o.accordionwidget[i], 'accwidget', i);
				nc.accordion($o.accordionwidget[i]);
			}
		}

		/*----------  SWIPER  ----------*/
		if ($o.swiperwidget) {
			for (var i = 0; i < $o.swiperwidget.length; i++) {
				// SET ID ON ALL OBJECTS
				var swiObj = 'swiper' + i;
				$($o.swiperwidget[i]).css({ opacity: 0 }).attr("id", swiObj).addClass(swiObj);
				nc.swiper_slider("#" + swiObj);
			}
		}
		// Swiper gallery mode
		if ($o.swipergallery) {
			for (var i = 0; i < $o.swipergallery.length; i++) {
				// SET ID ON ALL OBJECTS
				var swiGal = 'swiperGallery' + i;
				$($o.swipergallery[i]).css({ opacity: 0 }).attr("id", swiGal).addClass(swiGal);
				nc.swiper_gallery("#" + swiGal);
			}
		}

		/*----------  VIDEO BACKGROUND  ----------*/
		if ($o.videobg) {
			var mbyt_script_arr = ["lib/jquery.mb.YTPlayer/jquery.mb.YTPlayer.min.js"];
			nc.getMultiScripts(mbyt_script_arr, '').done(function () {
				for (var i = 0; i < $o.videobg.length; i++) {
					nc.videoBg($o.videobg[i]);
				}
			});
			
		};
		if ($o.videwidget) {
			var vide_script_arr = ["lib/Vide/jquery.vide.min.js"];
			nc.getMultiScripts(vide_script_arr, '').done(function () {
				for (var i = 0; i < $o.videwidget.length; i++) {
					nc.setId($o.videwidget[i], 'videwidget', i);
					nc.vide($o.videwidget[i]);
				}
			});
		}

		/*----------  POP GALLERY  ----------*/
		if ($o.popgallerywidget) {
			for (var i = 0; i < $o.popgallerywidget.length; i++) {
				$o.popgallerywidget[i]

				$($o.popgallerywidget[i]).attr("id", 'popgallery' + i).addClass('popgallery' + i);

				$('#popgallery' + i).magnificPopup({
					delegate: '.pop-img',
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'mfp-img-mobile',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function (item) {
							return item.el.attr('title');
						}
					}
				});
			}
		}

		/*----------  SLIDESHOW  ----------*/
		if (nc.elcheck($o.bgslider)) {
			var vages_script_arr = [
				"lib/vegas/vegas.min.js"
			];

			nc.getMultiScripts(vages_script_arr, '').done(function () {
				for (var i = 0; i < $o.bgslider.length; i++) {

					var s1 = $($o.bgslider[i]).attr('data-bgslider'),
						s2 = s1.split('|'),
						bgslides = [];

					$.each(s2, function (index, val) {
						bgslides.push({ src: val });
					});

					$($o.bgslider[i]).vegas({
						delay: 6000,
						slides: bgslides,
						timer: false,
						animation: 'fade'
					});
				}
			});
		};

		/*----------  KENBURN-SLIDESHOW  ----------*/
		if (nc.elcheck($o.kbgslider)) {
			var vages_script_arr = [
				"lib/vegas/vegas.min.js"
			];

			nc.getMultiScripts(vages_script_arr, '').done(function () {
				for (var i = 0; i < $o.kbgslider.length; i++) {

					var s1 = $($o.kbgslider[i]).attr('data-kbgslider'),
						s2 = s1.split('|'),
						bgslides = [];

					$.each(s2, function (index, val) {
						bgslides.push({ src: val });
					});

					$($o.kbgslider[i]).vegas({
						delay: 6000,
						slides: bgslides,
						timer: false,
						animation: 'kenburns'
					});
				}
			});
		};

		/*----------  COUNTDOWN  ----------*/
		if ($o.countdownwidget) {
			for (var i = 0; i < $o.countdownwidget.length; i++) {
				$($o.countdownwidget[i]).children('div').attr("id", 'countdown' + i);
				nc.countdown("#countdown" + i);
			}
		}

		/*----------  FILTER WIDGET  ----------*/
		if ($o.filterwidget) {
			for (var i = 0; i < $o.filterwidget.length; i++) {
				$o.filterwidget[i]
				nc.setId($o.filterwidget[i], 'filterwidget', i);
				nc.filter($o.filterwidget[i]);
			}
		}

		/*----------  GOOGLE MAP  ----------*/
		if ($o.gmapwidget) {
			var social_script_arr = [
				"https://maps.googleapis.com/maps/api/js?sensor=false",
				"lib/MapIt/jquery.mapit.min.js"
			];

			nc.getMultiScripts(social_script_arr, '').done(function () {
				for (var i = 0; i < $o.gmapwidget.length; i++) {
					nc.setId($o.gmapwidget[i], 'gmapwidget', i);
					nc.gmapset($o.gmapwidget[i]);
				}
			});
		}

		/*----------  SOCIAL  ----------*/
		if ($o.socialsection) {

			var social_script_arr = [
				"bower_components/codebird-js/codebird.js",
				"bower_components/doT/doT.min.js",
				"bower_components/moment/moment.min.js",
				"js/jquery.socialfeed.js"
			];

			nc.getMultiScripts(social_script_arr, 'lib/social-feed/').done(function () {

				// TWITTER
				if ($o.twitterwidget) {
					for (var i = 0; i < $o.twitterwidget.length; i++) {
						nc.setId($o.twitterwidget[i], 'twitterwidget', i);
						nc.twitter($o.twitterwidget[i]);
					}
				}

			});
		}

		/*----------  FORM  ----------*/
		if ($o.formwidget) {
			for (var i = 0; i < $o.formwidget.length; i++) {
				$o.formwidget[i]
				nc.formWidget($o.formwidget[i]);
				if ($('html').hasClass('builder')) {
					$($o.formwidget[i]).find('button').attr('disabled', true);
				} else {
					$($o.formwidget[i]).find('button').attr('disabled', false);
				}
			}
		};

		/*----------  DEMO  ----------*/
		if ($('html').attr('data-demomenu') == 'y') {
			$.ajax({
				url: "demo-menu/all-demos.html"
			}).done(function(data) {
				$('body').append(data);
			});
		}

		/*----------  RESPONSIVE  ----------*/
		enquire.register("screen and (min-width: 992px)", {
			match : function() {
				nc.device = 'd';
				$("html").addClass('desktop');
			},  
			unmatch : function() { 
				$("html").removeClass('desktop');
			}
		}).register("(min-width: 200px) and (max-width: 991px)", {
			match : function() {
				nc.device = 'm';
				$("html").addClass('mobile');
			},  
			unmatch : function() {
				$("html").removeClass('mobile');
			}
		});

		return $o;
	}


	jQuery(document).ready(function ($) {

		var $o = nc.init();

		if ($o.r) {

			$('html').before('<!-- ' + package_ver + ' -->');

			$o.tooltip.tooltip({
				container: 'body'
			});

			$(".copyright-year").text(new Date().getFullYear());
			
			if ($o.bLazy) {
				nc.blazyload();
			}

			/*----------  LOADER  ----------*/
			Pace.on('done', function(){
				nc.animationIn(".mainwrapper--nclayer2 .active");
			});

		} else {
			$o.r ? nc.demo() : $('html').html('');
		}
	});

})();
