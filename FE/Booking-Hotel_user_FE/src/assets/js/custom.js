(function ($) {
    //preloader js
    $(window).on('load', function () {
        $('.preloader').fadeOut(1000);
    })


    //========== Header  Start =========//

    $("ul>li>.submenu").parent("li").addClass("menu-item-has-children");
    // drop down menu width overflow problem fix
    $('ul').parent('li').on('hover', function () {
        var menu = $(this).find("ul");
        var menupos = $(menu).offset();
        if (menupos.left + menu.width() > $(window).width()) {
            var newpos = -$(menu).width();
            menu.css({
                left: newpos
            });
        }
    });

    $('.menu li a').on('click', function (e) {
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp(300, "swing");
        } else {
            element.addClass('open');
            element.children('ul').slideDown(300, "swing");
            element.siblings('li').children('ul').slideUp(300, "swing");
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp(300, "swing");
        }
    })
    $('.ellepsis-bar').on('click', function (e) {
        var element = $('.header-top');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.slideUp(300, "swing");
            $('.overlayTwo').removeClass('active');
        } else {
            element.addClass('open');
            element.slideDown(300, "swing");
            $('.overlayTwo').addClass('active');
        }
    });
    $('.header-bar').on('click', function () {
        $(this).toggleClass('active');
        $('.menu').toggleClass('active');
    })

    //Header
    var fixed_top = $("header");
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            fixed_top.addClass("header-fixed fadeInUp");
        } else {
            fixed_top.removeClass("header-fixed fadeInUp");
        }
    });



    //header search
    $('.search-btn').click(function (e) {
        e.preventDefault();

        // Toggle the visibility and animation of the search bar
        $('.search-bar').toggleClass('active');
    });


    //========== Header End =========//




    //========== Scroll to top Start =========//
    $(function () {
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $('.scrollToTop').css({
                    'bottom': '5%',
                    'opacity': '1',
                    'transition': 'all .5s ease'
                });
            } else {
                $('.scrollToTop').css({
                    'bottom': '-30%',
                    'opacity': '0',
                    'transition': 'all .5s ease'
                })
            }
        });

        //Click event to scroll to top
        $('a.scrollToTop').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    });

    //========== Scroll to to top end =========//

    //Animation on Scroll initializing
    AOS.init();

    // lightcase initializing
    $('a[data-rel^=lightcase]').lightcase();



    //====<<  Custom cursor>>==========
    var kursorx = new kursor({
        type: 1,
        color: '#E8A41D'
    })

    //======================Home 2 gallery grid isotop start
    // initialize Isotope
    var $grid = $('.gallery__grid').imagesLoaded(function () {
        // init Isotope after all images have loaded
        $grid.isotope({
            itemSelector: '.gallery__grid-item',
            layoutMode: 'fitRows'
        });
    });

    // filter items on button click
    $('.common-filter__btn').on('click', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });

    // change active class on buttons
    $('.common-filter').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', '.common-filter__btn', function () {
            $buttonGroup.find('.active').removeClass('active');
            $(this).addClass('active');
        });
    });
    //======================Home 2 gallry istop end

    //counter initialized
    new PureCounter();











    var $bars = $(".skills__item-bar"),
        methods = {
            init: function () {

                // Bind events
                methods.bindEvents();

            },
            bindEvents: function () {

                // Loop through each of the bars...
                $bars.each(function () {

                    var $bar = $(this),
                        $pct = $bar.find(".skills__item-data"),
                        data = $bar.data("bar");

                    setTimeout(function () {

                        $bar
                            .css("background-color", data.color)
                            .animate({
                                "width": $pct.html()
                            }, data.speed || 3000, function () {

                                $pct.css({
                                    "color": data.color,
                                    "opacity": 1
                                });

                            });

                    }, data.delay || 0);

                });

            }
        };

    // Initialize on page load
    methods.init();



















    //initialize nice select plugin
    $('select').niceSelect();

    //initalize the flatpickR Date picker plugin
    $(".date-input").flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    });


    //Hero slider
    var swiper = new Swiper(".hero__slider", {
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        slidesPerView: 1,
        navigation: {
            prevEl: ".hero__slider-prev",
            nextEl: ".hero__slider-next"
        },
        // autoplay: {
        //     delay: 1,
        // },
        speed: 1500,
    });


    //Service Slider
    var swiper = new Swiper(".service__slider", {
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".service__slider-prev",
            nextEl: ".service__slider-next"
        },
        // autoplay: {
        //     delay: 1,
        // },
        speed: 3500,
    });



    var swiper = new Swiper(".sponsor__slider", {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        rewind: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
        },
    });



    var swiper = new Swiper(".testimonial__slider", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });




    //Countdown js initialization
    document.addEventListener('readystatechange', event => {
        if (event.target.readyState === "complete") {
            var clockdiv = document.getElementsByClassName("countdown");
            var countDownDate = new Array();
            for (var i = 0; i < clockdiv.length; i++) {
                countDownDate[i] = new Array();
                countDownDate[i]['el'] = clockdiv[i];
                countDownDate[i]['time'] = new Date(clockdiv[i].getAttribute('data-date')).getTime();
                countDownDate[i]['days'] = 0;
                countDownDate[i]['hours'] = 0;
                countDownDate[i]['seconds'] = 0;
                countDownDate[i]['minutes'] = 0;
            }

            var countdownfunction = setInterval(function () {
                for (var i = 0; i < countDownDate.length; i++) {
                    var now = new Date().getTime();
                    var distance = countDownDate[i]['time'] - now;
                    countDownDate[i]['days'] = Math.floor(distance / (1000 * 60 * 60 * 24));
                    countDownDate[i]['hours'] = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    countDownDate[i]['minutes'] = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    countDownDate[i]['seconds'] = Math.floor((distance % (1000 * 60)) / 1000);

                    if (distance < 0) {
                        countDownDate[i]['el'].querySelector('.countdown__number-days').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.countdown__number-hours').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.countdown__number-minutes').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.countdown__number-seconds').innerHTML = 0;
                    } else {
                        countDownDate[i]['el'].querySelector('.countdown__number-days').innerHTML = countDownDate[i]['days'];
                        countDownDate[i]['el'].querySelector('.countdown__number-hours').innerHTML = countDownDate[i]['hours'];
                        countDownDate[i]['el'].querySelector('.countdown__number-minutes').innerHTML = countDownDate[i]['minutes'];
                        countDownDate[i]['el'].querySelector('.countdown__number-seconds').innerHTML = countDownDate[i]['seconds'];
                    }
                }
            }, 1000);
        }
    });


})(jQuery);