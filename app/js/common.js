 window.onload = function () {
     $('.menu').mobileMenu({
         menuIconClassName: ".menu__icon",
         mobileResolution: 900,
         menuType: "sticky",
         offsetToSticky: 80,
         closeIconClassName: ".close-menu-icon"
     });

     const starEls = document.querySelectorAll('.star.rating');
     starEls.forEach(star => {
         star.addEventListener('click', function (e) {
             let starEl = e.currentTarget;
             starEl.parentNode.setAttribute('data-stars', starEl.dataset.rating);
         });
     })

     $('.slider').slick({
         lazyLoad: 'progressive',
         slidesToShow: 3,
         slidesToScroll: 1,
         prevArrow: '<div class="myslick-prev"><svg width="16" height="16" fill="#4D4D4D"><use xlink: href = "img/sprite.svg#arrow" ></use></svg></div>',
		nextArrow: '<div class="myslick-next"><svg width="16" height="16" fill="#4D4D4D"><use xlink: href = "img/sprite.svg#arrow"></use></svg ></div> ',
         responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
				}
    		}
  		]
     });


 };
