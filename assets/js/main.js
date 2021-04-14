

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var displayBoxIndex = -1;

		$("#arrow a").on("mouseenter", function() {
			$("#arrow a").attr("class", "special");

			if($("#arrow a").index(this) == 0) {
				$(this).attr("class", "special scroll arrow-hover");
			} else {
				$(this).attr("class", "special arrow-hover");
			}
		});

		$("#arrow").on("click", "a.scroll", function() {
			$("html, body").animate({
				scrollTop: $("#two").offset().top
			}, 1500);
		});

		$(document).keydown(function(e) {
		    if (e.keyCode == 40) { // Down
				e.preventDefault();
		        Navigate(1);
		    }
			if(e.keyCode == 38) { // Up
				e.preventDefault();
		        Navigate(-1);
		    }
			if(e.keyCode == 13) { // Enter
				if($("#arrow a").index($("#arrow a.arrow-hover")) == 1) {
					$("html, body").animate({
						scrollTop: $("#three").offset().top
					}, 1500);
				} else {
					location.href = $(".arrow-hover").prop("href");
				}
			}
		});

		var Navigate = function(diff) {
		    displayBoxIndex += diff;
		    var oBoxCollection = $("#arrow > li > a");
		    if (displayBoxIndex >= oBoxCollection.length)
		         displayBoxIndex = 0;
		    if (displayBoxIndex < 0)
		         displayBoxIndex = oBoxCollection.length - 1;
		    var cssClass = "arrow-hover";
		    oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).addClass(cssClass);
		}


		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);
