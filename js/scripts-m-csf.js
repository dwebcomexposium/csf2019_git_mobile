;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		var $body = $('body');

		var classes = {
			Hover       : 'hover',
			Active      : 'active',
			ShowNavMain : 'show-nav-main',
			FixedHeader : 'show-fixed-header',
			PageLoad    : 'page-load'
		};

		var is = {
			Mobile  : false,
			Desktop : false,
			Tablet  : false
		};

		var get = {
			Scroll   : 0,
			WinWidth : 0
		};

			/*
				# - Ready
			*/

		$('.newsletter-form .nf-main-content').prepend('<a href="#" class="newsletter-close"></a>');
		// $('.article_list .global-wrapper, .article .global-wrapper').prepend('<div class="page-circle">');
		// $('.gla-item-img').wrap('<div class="gla-item-img-wrapper">');
		// $('.an-item-illust').wrap('<div class="an-item-img-wrapper">');
		// $('.la-list .la-item-content').wrapInner('<div class="la-item-content-inner">');
		// $('.exposer-focus img').wrap('<div class="af-image">').parent().css('background-image: url(' + $('.exposer-focus img').attr('src') + ')');
		$('.site-banner .main-navigation, .site-banner .block-social, .site-banner .lang-switcher').wrapAll('<div class="nav-wrapper"><div class="nav-inner"></div></div>');
		$('.site-banner .nav-inner').append($('.site-banner > .inside > .header-topquicklinks').clone());
		$('.site-banner .sb-menu-trigger, .site-banner #cxpmClientAccountWidget, .site-banner .global-search-form').wrapAll('<div class="nav-bar"></div>')
		$('.site-banner .nav-bar').prepend($('.site-banner > .inside > .header-topquicklinks').clone());
		$('.block-tiles').append('<div class="slider-pagin">');
		$('.exposer .carrousel-anim-home .la-slider').append('<div class="slider-pagin">');
		$('.article-title .inside').append($('.article-title .at-illust').wrap('<div class="article-image-wrapper">').parent().detach());
		$('.article-title .article-image-wrapper').append($('.article-title .at-theme').detach());

		addDeviceResolution();
		addBaseClickEvents();
		tabs();

			/*
				# - Load
			*/

		$win.on('load', function(){
			$('body').addClass('loaded');

			adjustSliderHeight();
		});

			/*
				# - Scroll
			*/

		$win.on('scroll', function(){
			get.Scroll = $win.scrollTop();

			$body.toggleClass(classes.FixedHeader, (get.Scroll > 52));

			adjustSliderHeight();
		});

			/*
				- # - Resize Orientationchange
			*/

		$win.on('resize orientationchange', function(){
			addDeviceResolution();
			adjustSliderHeight();
		});

		/*
			# - Functions -	
		*/

	    function addAnimateAttr(input) {
	        for (i = 0; i < input.length; i++) {
	            $(input[i]).attr('data-aos', 'fade-in');
	        }
	    }

		function tabs() {
			$('.jsTabs .tabs__nav a').click(function(e){
			    var $this = $(this);
			    var index = $this.parent().index();
			    var $tabs = $this.closest('.jsTabs');

			    e.preventDefault();

			    $this.parent().add($tabs.find('.tab:nth-child(' + (index + 1) + ')')).addClass('active').siblings().removeClass('active');
			});
		}

		function adjustSliderHeight() {
			setTimeout(function(){
				$('.carrousel-home .caroufredsel_wrapper').height($('.carrousel-home .slider-content').outerHeight());
				$('.block-tiles .tiles-item, .block-tiles .tiles, .block-tiles .caroufredsel_wrapper').height($('.block-tiles .tiles .tiles__image').outerHeight());
			},50);
		}

		// Prepare sliders
		function prepareSlider($slider) {
			var $sliderClone = $slider.clone();

			$slider.after($sliderClone);
			$slider.remove();

			$sliderClone
				.attr('style', '')
					.find('.slider-content')
						.attr('style', '');
		}

		// Start Slider
		function startSlider($slider, options) {
			var $slidesContainer = $slider.find('.slider-content').length ? $slider.find('.slider-content') : $slider.find('.slider__slides');

			$slidesContainer.carouFredSel(options);
		}

		if ($('.carrousel-home .slider').length) {
			prepareSlider($('.carrousel-home .la-slider'));

			$win.on('load', function(){
				startSlider($('.carrousel-home .la-slider'), {
					width: '100%',
					items: 1,
					responsive: true,
					scroll: { 
						fx: 'fade',
						duration: 400,
						onBefore: function() {
							$(this)
									.find('.la-item')
										.removeClass('active');
						},
						onAfter: function() {
							$(this)
									.find('.la-item:first-child')
										.addClass('active');
						}
					},
					swipe: {
						onTouch: true,
						onMouse: false
					},
					auto: {
						play: false,
						timeoutDuration: 7000
					},
					pagination: {
						container: '.carrousel-home .slider-pagin'
					},
					onCreate: function() {
						$(this)
								.find('.la-item:first-child')
									.addClass('active');

						$('.carrousel-home .la-item-img').each(function(){
							$(this).wrap('<div class="slider-image">')
						});
					},
					infinite: true
				});
			});
		}

		if ($('.tiles').length) {
			$win.on('load', function(){
				$('.tiles').carouFredSel({
					width: '100%',
					items: 1,
					responsive: true,
					swipe: {
						onTouch: true,
						onMouse: false
					},
					auto: {
						play: true,
						timeoutDuration: 5000
					},
					swipe: {
						onTouch: true,
						onMouse: false
					},
					pagination: {
						container: '.block-tiles .slider-pagin'
					},
					infinite: true
				});
			});
		}

		if ($('.carrousel-anim-home .slider').length) {
			prepareSlider($('.carrousel-anim-home .slider'));

			$win.on('load', function(){
				startSlider($('.carrousel-anim-home .slider'), {
					width: '100%',
					items: 1,
					responsive: true,
					scroll: { 
						fx: 'fade',
						duration: 400,
						onBefore: function() {
							$(this)
									.find('.la-item.active')
										.removeClass('active');
						},
						onAfter: function() {
							$(this)
									.find('.la-item:first-child')
										.addClass('active');
						}
					},
					swipe: {
						onTouch: true,
						onMouse: false
					},
					auto: {
						play: false,
						timeoutDuration: 5000
					},
	                prev : '.carrousel-anim-home .slider-arrow--prev', 
	                next : '.carrousel-anim-home .slider-arrow--next',
					pagination: {
						container: '.carrousel-anim-home .slider-pagin'
					},
					onCreate: function() {
						$(this)
								.find('.la-item:first-child')
									.addClass('active');
					},
					infinite: true
				});
			});
		}

		function closeNewsletter() {
			$body.removeClass('show-newsletter');
			$('.newsletter-form').fadeOut(400);
		}

		function addBaseClickEvents() {
			$body.on('click touchstart', function(event){
				var $target = $(event.target);

				if (!$target.parents('.gsf-fields').length) {
					$target.closest('.global-search-form.is-visible').removeClass('is-visible');
				}
			});

			$('.sb-menu-trigger').click(function(event){
				event.preventDefault();

				$body.toggleClass(classes.ShowNavMain);

				$('.site-banner .main-navigation').stop().slideDown();
			});	

			$('.mn-item-has-submenu').click(function(){
				$(this).find('.mn-menu-submenu').stop().slideToggle().parent().siblings().find('.mn-menu-submenu').slideUp();
			});

			$('[href="#newsletter"]').click(function(e){
				if ($('.newsletter-form').length) {
					e.preventDefault();

					$body.addClass('show-newsletter');
					$('.newsletter-form').fadeIn(400);
				}
			});

			$('.newsletter-form').click(function(event){
				var $target = $(event.target);

				if (!$target.parents('.newsletter-form').length) {
					closeNewsletter();
				}
			});

			$('.newsletter-close').click(function(e){
				e.preventDefault();

				closeNewsletter();
			});
		}

		function addDeviceResolution() {
			get.WinWidth = $win.width();

			is.Desktop = (get.WinWidth > 1024); 
			is.Mobile  = (get.WinWidth <= 767);
			is.Tablet  = (get.WinWidth <= 1024 && get.WinWidth >= 768);
		}
	});

})(jQuery, window, document);
