(function ($) {
	$.fn.mobileMenu = function (options) {
		var options = $.extend({}, {
			menuIconClassName: ".menu-icon",
			mobileResolution: 768,
			menuType: "fixed",
			offsetToSticky: 50,
			closeIconClassName: ".close-menu-icon"
		}, options);

		var $menu = $(this);
		var $menuList = $menu.find("ul");
		var $menuLinks = $menu.find("ul a");
		var $menuIcon = $(options.menuIconClassName);
		var $closeIcon = $(options.closeIconClassName);
		var currentMenuHeight = $menu.outerHeight();
		var documentWidth = $(document).width();
		var menuHeightFixed;
		var menuIsOpened = false;
		var offset = 0;
		var scrollPos = 0;
		var isFirstScroll = true;

		if (documentWidth >= options.mobileResolution) {
			if (options.menuType == "sticky") {
				currentMenuHeight = $menu.outerHeight() * 2;
				menuHeightFixed = currentMenuHeight;
				offset = currentMenuHeight;
			}
			if (options.menuType == "fixed") {
				currentMenuHeight = $menu.outerHeight();
				offset = currentMenuHeight;
			}
			if (options.menuType == "custom") {
				currentMenuHeight = $menu.outerHeight();
				offset = currentMenuHeight;
			}
		} else {
			currentMenuHeight = $menu.outerHeight();
			offset = currentMenuHeight;
		}

		$(window).on("resize", onResizeChangeState);
		$menuIcon.on("click", onClickChangeState);
		$(document).on("scroll", onScroll);
		$menuLinks.on("click", scrollTo);

		if ($closeIcon) {
			$closeIcon.on("click", function () {
				if (menuIsOpened) {
					hideMenu();
				}
			});
		}

		function onClickChangeState(event) {
			if (!menuIsOpened) {
				showMenu();
			} else {
				hideMenu();
			}
		}

		function onResizeChangeState(event) {
			documentWidth = $(document).width();
			if (!menuIsOpened && documentWidth > options.mobileResolution) {
				showMenu();
			} else if (menuIsOpened && documentWidth <= options.mobileResolution) {
				hideMenu();
			}
		}

		function onScroll(event) {
			scrollPos = $(document).scrollTop();
			if (documentWidth >= options.mobileResolution) {
				if (options.menuType == "sticky") {
					fixedMenu();
				}
				if (options.menuType == "custom") {
					customMenu();
				}
			}
			$menuLinks.each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.position().top <= scrollPos + offset && refElement.position().top + refElement.height() > scrollPos) {
					$menuLinks.removeClass("active");
					currLink.addClass("active");
				}
			});
		}

		function scrollTo(event) {
			var target = this.hash;
			var $target = $(target);
			event.preventDefault();
			if ($(document).width() <= options.mobileResolution) {
				hideMenu();
			}
			$menuLinks.each(function () {
				$(this).removeClass("active");
			})
			$(this).addClass("active");

			$("html, body").stop().animate({
				'scrollTop': $target.offset().top - offset
			}, 500, "swing", function () {});
		}

		function fixedMenu() {
			if (scrollPos > options.offsetToSticky) {
				$menu.addClass("sticky-menu");
				currentMenuHeight = $menu.outerHeight();
			} else {
				currentMenuHeight = menuHeightFixed;
				$menu.removeClass("sticky-menu");
			}
			offset = currentMenuHeight;
		}

		function customMenu() {
			if (scrollPos > 50) {
				$menu.addClass("custom-menu");
			} else {
				$menu.removeClass("custom-menu");
			}
		}

		function showMenu() {
			$menuList.css("display", "flex");
			menuIsOpened = true;
		}

		function hideMenu() {
			$menuList.css("display", "none");
			menuIsOpened = false;
		}

		return this;
	};

})(jQuery);
