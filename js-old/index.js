/**
 * Created by konstantingreat on 04.12.19.
 */
//&& !$('.this-is-admin').length
var ajax_load = 0;
var page = 1;
var max_page = 1;


$(function(){

    /*$(document).bind("ajaxSend",function(){
        $("#system_loading").show(); ajax_load=true;
    }).bind("ajaxComplete",function(){
        $("#system_loading").hide(); ajax_load=false;
    });*/

    // var slider = document.getElementById('slider');
    //
    // noUiSlider.create(slider, {
    //     start: [0],
    //     connect: true,
    //     range: {
    //         'min': 0,
    //         'max': 100
    //     }
    // });

    initSliderScrolls()

    $( window ).resize(function() {
        initSliderScrolls(true)

        scrollBarWidth()
    });

    function initSliderScrolls(resize = false){
        $('.client-story-list').mCustomScrollbar({axis:"x", mouseWheel:{ axis: "x",invert: true }});
        $('.popular-articles-list').mCustomScrollbar({axis:"x", mouseWheel:{ axis: "x",invert: true }});
        if($('.we-recommend').length && $(window).width()>768) {
            $('.we-recommend .item-list').mCustomScrollbar({axis: "x", mouseWheel: {axis: "x", invert: true}});
        }
        $('.team-list').mCustomScrollbar({axis:"x", mouseWheel:{ axis: "x",invert: true }});
        $('.licence-certificates-wrap .doc-list').mCustomScrollbar({axis:"x", mouseWheel:{ axis: "x",invert: true }});

        if($(window).width()>=768 && $(window).width()<=1360){
            $('.all-services-in-one .service-list').mCustomScrollbar({axis:"x", mouseWheel:{ axis: "x",invert: true }});
        }
        else if($('.all-services-in-one .service-list.mCustomScrollbar').length) {
            $('.all-services-in-one .service-list').mCustomScrollbar('destroy');
        }
        //$("#scrollableDiv").removeClass("mCustomScrollbar");

        if($('.index-slider').length && $(window).width()>768){
            if(resize){
                $('.index-slider').slick('refresh');
            }else {
                $('.index-slider').slick({
                    // lazyLoad: 'ondemand',
                    // mobileFirst:true,
                    // autoplay:true,
                    //speed:300,
                    initialSlide:0,
                    infinite: true,
                    // infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    nextArrow: $('.plus-list-wrap .arrow-right'),
                    prevArrow: $('.plus-list-wrap .arrow-left'),
                    dots:true,
                    // dotsClass:'pager',
                    appendDots:$('.index-slider-wrap .pager'),
                    // variableWidth: true,
                    touchThreshold:200,
                    centerPadding: 0,
                    centerMode:true,
                });
            }
        }

        if(resize && $(window).width()<768){
            if($('.index-slider.slick-initialized').length){
                $('.index-slider.slick-initialized').slick('unslick');
            }

        }
    }




    $('.faq-wrap .item > .title').on('click',function () {
        if($(this).parents('.item').hasClass('active')){
            $(this).parents('.item').removeClass('active')
        }
        else {
            $('.faq-wrap .item').removeClass('active')
            $(this).parents('.item').addClass('active')
        }
    })
    $('.vacancy-list .vacancy-item > .item-title-line').on('click',function () {
        if($(this).parents('.vacancy-item').hasClass('active')){
            $(this).parents('.vacancy-item').removeClass('active')
        }
        else {
            $('.vacancy-list .vacancy-item').removeClass('active')
            $(this).parents('.vacancy-item').addClass('active')
        }
    })









    $('#information').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        //console.log(button,'button')
        var recipient = $(button).attr('href') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        if($(recipient).length){
            modal.find('.modal-body').html($(recipient).html())
        }
    })


    $('#information').on('shown.bs.modal', function (event) {
        if($('.modal.show .modal-slider').length){
            $('.modal.show .modal-slider').slick({
                initialSlide:0,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                nextArrow: $('.modal.show .modal-arrows .arrow-right'),
                prevArrow: $('.modal.show .modal-arrows .arrow-left'),
                dots:true,
                appendDots:$('.modal.show .modal-pager'),
                // variableWidth: true,
                touchThreshold:200,
                centerPadding: 0,
                centerMode:true,
            });
        }
    })


    $("[name='phone']").mask("9(999) 999-99-99", {placeholder: "_"});


    //$('[name="sessid"]').val(BX.message('bitrix_sessid'))

    /*--- Forms validation --------------------------------------------------*/
    $(".js-validate").each(function(){
        $(this).validate({
            focusInvalid: false,
            rules: {
                name: { required: true },
                surname: { required: true },
                mail:  { required: true, email: true },
                email:  { required: true, email: true },
                phone:  { required: true },
                company:  { required: true },
                position:  { required: true },
                captcha: { required: true },
                agree: { required: true },
                message: { required: true }

            },
            messages: {
                name: "",
                surname: "",
                mail: "",
                email: "",
                phone: "",
                company: "",
                position: "",
                captcha: "",
                agree: "",
                message: "",
            },
            errorClass: "input-error",
            highlight: function(element, errorClass) {
                if($(element).attr('name')=='agree'){
                    $(element).addClass(errorClass);
                }
                else {
                    $(element).addClass(errorClass);
                }

            },
            unhighlight: function(element, errorClass) {
                if($(element).attr('name')=='agree'){
                    $(element).removeClass(errorClass);
                }
                else {
                    $(element).removeClass(errorClass);
                }
            },
            errorPlacement: function(error, element) {
                //error.insertBefore(element);
            },
            submitHandler: function(form) {

                console.log('submit')


                // $(form).hide();
                // $(form).siblings(".js-form-ok").show();
                // $(form).siblings(".js-form-error").show();
                /*if($(form).find('[name="agree"]').length&&!$(form).find('[name="agree"]:checked').length){
                    alert('Необходимо подтвердить согласие с Условиями обработки персональных данных');
                    return false;
                }*/

                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: '/local/tools/form-handler.php',
                    data: $(form).serialize(),
                    error: function(){
                        console.log("Error messages");
                    },
                    success: function(data) {
                        if(!data.error){
                            $(form).hide();
                            $(form).siblings(".js-form-ok").show();

                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                                'event': 'formIspdn'
                            });



                            if(typeof VK!='undefined') {
                                VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
                                VK.Retargeting.Event("corpsoft_macro_lead");
                            }

                            var _tmr = window._tmr || (window._tmr = []);
                            _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_macro_lead" });
                        }
                        else {
                            //alert('Что-то пошло не так, попробуйте позже или свяжитесь с администрацией сайта.');
                            $(form).hide();
                            $(form).siblings(".js-form-error").show();
                        }

                    }
                });

                return false;
            }
        });
    });

    $('.subscribe-validate').validate({
        focusInvalid: false,
        rules: {
            email:  { required: true, email: true },
            agree: { required: true },
        },
        messages: {
            email: "",
            agree: "",
        },
        errorClass: "input-error",
        highlight: function(element, errorClass) {
            if($(element).attr('name')=='agree'){
                $(element).addClass(errorClass);
            }
            else {
                $(element).addClass(errorClass);
            }

        },
        unhighlight: function(element, errorClass) {
            if($(element).attr('name')=='agree'){
                $(element).removeClass(errorClass);
            }
            else {
                $(element).removeClass(errorClass);
            }
        },
        errorPlacement: function(error, element) {
            //error.insertBefore(element);
        },
        submitHandler: function(form) {

            console.log('submit')

            $.ajax({
                type: "POST",
                dataType: 'json',
                url: '/local/tools/subscribe.php',
                data: $(form).serialize(),
                error: function(){
                    console.log("Error messages");
                },
                success: function(data) {
                    if(!data.error){
                        $(form).hide();
                        $(form).siblings(".js-form-ok").show();

                    }
                    else {
                        //alert('Что-то пошло не так, попробуйте позже или свяжитесь с администрацией сайта.');
                        $(form).hide();
                        $(form).siblings(".js-form-error").show();
                    }

                }
            });

            return false;
        }
    });


    $(".vacancy-validate").each(function(){
        $(this).validate({
            focusInvalid: false,
            rules: {
                name: { required: true },
                email:  { required: true},
                agree: { required: true },
                message: { required: true }

            },
            messages: {
                name: "",
                email: "",
                agree: "",
                message: "",
            },
            errorClass: "input-error",
            highlight: function(element, errorClass) {
                if($(element).attr('name')=='agree'){
                    $(element).addClass(errorClass);
                }
                else {
                    $(element).addClass(errorClass);
                }

            },
            unhighlight: function(element, errorClass) {
                if($(element).attr('name')=='agree'){
                    $(element).removeClass(errorClass);
                }
                else {
                    $(element).removeClass(errorClass);
                }
            },
            errorPlacement: function(error, element) {
                //error.insertBefore(element);
            },
            submitHandler: function(form) {

                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: '/local/tools/vacancy.php',
                    data: $(form).serialize(),
                    error: function(){
                        console.log("Error messages");
                    },
                    success: function(data) {
                        if(!data.error){
                            $(form).hide();
                            $(form).siblings(".js-form-ok").show();
                        }
                        else {
                            //alert('Что-то пошло не так, попробуйте позже или свяжитесь с администрацией сайта.');
                            $(form).hide();
                            $(form).siblings(".js-form-error").show();
                        }

                    }
                });

                return false;
            }
        });
    });


    $('.try-form-again-trigger').on('click',function () {
        if($(this).parents('.modal-feedback-form-wrap').length){
            $(this).parents('.modal-feedback-form-wrap').find('form').fadeIn()
            $(this).parents('.js-form-error').hide();
        }
        else {
            $(this).parent().parent().find('form').fadeIn()
            $(this).parents('.js-form-error').hide();
        }

    })


    // $('#price-count').modal('show')

    if($('.map').length){

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=init';
        script.async = true;
        document.body.appendChild(script);
    }


    if($(window).width()<=1360){//$(window).width()<=768

        //.footer
        $('.menu-category > .title').on('click',function () {
            $(this).parents('.menu-category').toggleClass('active')
            return false;
        })
    }


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
        //event.target // newly activated tab
        //event.relatedTarget // previous active tab

        if($(event.target).hasClass('-reload-scroll-list')){

            $($($(event.target).attr('href')).find('.-scroll-list')).mCustomScrollbar("destroy");
            $($($(event.target).attr('href')).find('.-scroll-list')).mCustomScrollbar({axis:"x", mouseWheel:{ axis: "x",invert: true }});
        }

    })

    $('.mobile-dropdown-trigger .nav-link').on('click',function () {
        if($(this).hasClass('active')){
            $(this).parents('.tab-links-wrap').toggleClass('active')
        }
        else {
            $(this).parents('.tab-links-wrap').removeClass('active')
        }


        // $(this).parents('mobile-dropdown-trigger').find('.nav-link').removeClass('active')
        // $(this).addClass('active')
    })

    $('.service-text-lines-wrap .show-more-mobile').on('click',function () {
        $(this).prev().addClass('active')
        $(this).hide()
    })

    $('.doc-templates-download-wrap .show-more-mobile').on('click',function () {
        $(this).parents('.doc-templates-download-wrap').addClass('active')
        $(this).hide()
    })

    $('.video-wrap').on('click',function(){
        $(this).addClass('active')
        $(this).find('img').fadeOut();
    })

    $('.mobile-menu-trigger,.tablet-menu-trigger').on('click',function () {
        $(this).toggleClass('active')
        //$('.auth-search-wrap').toggleClass('active')
        $('.top-menu-mobile').toggleClass('active')
        // $('body').toggleClass('modal-open')
        $('body').toggleClass('-mobile-menu')
    })


    $(document).on('click', '[data-toggle=anchor]', function (e) {
        e.preventDefault();

        if($('.stick-tabs-wrap').length){
            $('html,body').animate({scrollTop:$($(this).attr("href")).offset().top-150},"300");
        }
        else {
            $('html,body').animate({scrollTop:$($(this).attr("href")).offset().top-50},"300");
        }


        return false;
    });




    $("[name='search']").on('keyup',
        delay(function (e) {
            ajax_load = 1;
            this_search_val = $(this).val();
            $.ajax({
                type: "GET",
                url: '/local/tools/search.php',
                data: {
                    q:this_search_val
                },
                success: function(data) {
                    ajax_load = 0;
                    if(data){
                        $(".search-result-list").show().html(data);
                    }
                }
            });

        }, 500)
    );

    $('.search-input-submit-wrap form').on('submit',function () {

        $.ajax({
            type: "GET",
            url: '/local/tools/search.php',
            data: {
                q:$('[name="search"]').val()
            },
            success: function(data) {
                ajax_load = 0;
                if(data){
                    $(".search-result-list").show().html(data);
                }
            }
        });

        return false;
    })



    $('.dropdown-service-menu .menu-item').on('click',function () {
        if($(this).data('tab-pane')){
            $(this).parents('.left-menu').find('.menu-item').removeClass('active')
            $(this).addClass('active')

            $('.dropdown-service-menu .tab-pane').removeClass('active')
            $('#'+$(this).data('tab-pane')).addClass('active')

            $('.dropdown-service-menu').removeClass('-aqua-blue-items -yellow-items -cornflower-blue-items')
            $('.dropdown-service-menu').addClass($(this).data('tab-pane'))
        }
    })

    /*$('.show-dropdown-service-menu').hover(
        function(){
            $('.dropdown-service-menu-wrap').addClass('active')
        },
        function () {
            $('.dropdown-service-menu-wrap').removeClass('active')
        }
    )*/


    /*$(window).on('mousewheel DOMMouseScroll', function(e) {
        var dir,
            amt = 100;

        e.preventDefault();
        if(e.type === 'mousewheel') {
            dir = e.originalEvent.wheelDelta > 0 ? '-=' : '+=';
        }
        else {
            dir = e.originalEvent.detail < 0 ? '-=' : '+=';
        }

        $('html, body').stop().animate({
            scrollTop: dir + amt
        },500, 'linear');


    })*/



    scrollBarWidth()




    // var lazyImages = [].slice.call(document.querySelectorAll(".-active-animate"));
    //
    // if ("IntersectionObserver" in window) {
    //     var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
    //         entries.forEach(function(entry) {
    //             if (entry.isIntersecting) {
    //                 var lazyImage = entry.target;
    //                 //console.log(lazyImage,'lazyImage')
    //
    //                 lazyImage.classList.remove("-active-animate");
    //                 lazyImageObserver.unobserve(lazyImage);
    //             }
    //         });
    //     });
    //
    //     lazyImages.forEach(function(lazyImage) {
    //         lazyImageObserver.observe(lazyImage);
    //     });
    // } else {
    //     // Possibly fall back to event handlers here
    //     lazyImages.forEach(function(lazyImage) {
    //         lazyImage.classList.remove("-active-animate");
    //     });
    // }



    var firstScreenHeight = $(window).height();
    if($(window).width()>768){
        firstScreenHeight = $(window).height() - 100;
    }

    const pageHeight = document.documentElement.scrollHeight
    let half_height_done = false;
    let seventy_five_height_done = false;

    $(window).on('scroll', function () {

        if ($(window).scrollTop() > firstScreenHeight) {
            $('.header').addClass('is-scrolled');
            $('.site-main').addClass('-header-padding');
        } else {
            $('.header').removeClass('is-scrolled');
            $('.site-main').removeClass('-header-padding');
        }




        var _scrollTop = $(this).scrollTop();

        $('.-parallax-element:visible').each(function (idx, element) {
            if($('.header.is-scrolled').length){
                start_paralax = $(element).offset().top - $('.header.is-scrolled').height()
                header_height = $('.header.is-scrolled').height();
            }
            else {
                start_paralax = $(element).offset().top;
                header_height = 0;
            }


            if (_scrollTop > start_paralax) {//$(element).height()+
                $(element).css({
                    transform: 'translate3d(0px,' + ($(window).scrollTop() - ($(element).offset().top - header_height)) * 0.2 + 'px,0px) scale(1.0)'
                });
            } else {
                $(element).css({
                    transform: 'translate3d(0px,0px,0px) scale(1.0)'
                });
            }
        })




        activeAnimate(_scrollTop)


        if(_scrollTop > pageHeight/2 && !half_height_done) {
            half_height_done = true;
            if(typeof VK!='undefined') {
                VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
                VK.Retargeting.Event("corpsoft_scroll50perc");
            }
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_scroll50perc" });
            console.log('50%')
        }
        if(_scrollTop > pageHeight*0.75 && !seventy_five_height_done) {
            seventy_five_height_done = true;
            if(typeof VK!='undefined') {
                VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
                VK.Retargeting.Event("corpsoft_scroll50perc");
            }
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_scroll50perc" });
            console.log('75%')
        }
    })


    setTimeout(function () {
        activeAnimate($(window).scrollTop())
    },50)




    /**
    retargeting analitic events
    **/
    $('.footer .headphones, .footer .phone, .footer .phone').on('click',function () {
        console.log('click footer link')

        if(typeof VK!='undefined'){
            VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
            VK.Retargeting.Event("corpsoft_prelead_footer");
        }

        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_prelead_footer" });

    })

    if($('.contacts-wrap').length){
        $('.contacts-wrap a').on('click',function () {
            if(typeof VK!='undefined') {
                VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
                VK.Retargeting.Event("corpsoft_prelead_contacts");
            }

            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_prelead_contacts" });

        })
    }

    $('.feedback-phone').on('click',function () {
        if(typeof VK!='undefined') {
            VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
            VK.Retargeting.Event("corpsoft_prelead_phone");
        }
        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_prelead_phone" });
    })

    $('[data-toggle="modal"]:not([data-target="#information"])').on('click',function () {
        if(typeof VK!='undefined') {
            VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
            VK.Retargeting.Event("corpsoft_prelead_form");
        }

        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_prelead_form" });

        //console.log('modal will show')
    })

    setTimeout(function () {
        if(typeof VK!='undefined') {
            VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
            VK.Retargeting.Event("corpsoft_nobounce15sec");
        }

        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({ id: "3246763", type: "reachGoal", goal: "corpsoft_nobounce15sec" });
        console.log('more 15s')

    },15000)

    $('.top-menu a').on('click',function () {
        if(typeof VK!='undefined') {
            VK.Retargeting.Init("VK-RTRG-539995-2uwwV");
            VK.Retargeting.Event("corpsoft_micro_onclick_menu");
        }
        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({ id: "3187553", type: "reachGoal", goal: "corpsoft_micro_onclick_menu" });
    })



})



function activeAnimate(_scrollTop) {
    if($('.-active-animate').length){

        $('.-active-animate:visible').each(function (idx, element) {
            if($('.header.is-scrolled').length){
                start_animate = $(element).offset().top - $('.header.is-scrolled').height() - $(window).height()/3*2
                header_height = $('.header.is-scrolled').height();
            }
            else {
                start_animate = $(element).offset().top - $(window).height()/3*2;
                header_height = 0;
            }


            if (_scrollTop > start_animate) {//$(element).height()+
                $(element).removeClass('-active-animate')
                console.log('rem -active-animate')
            }
        })
    }
}

/*var prevScrollpos = window.pageYOffset;
z
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if(document.getElementsByClassName("header").length) {


        if (prevScrollpos > currentScrollPos || currentScrollPos < 100) {
            document.getElementsByClassName("header")[0].style.top = "0";
        } else {
            /!*if(document.querySelectorAll('.filter-tags-wrapper,.visible').length){// && window.innerWidth<=375
                marginHeight = -108-document.querySelectorAll('.filter-tags-wrapper,.visible')[0].offsetHeight
            }*!/

            marginHeight = -100;


            //document.getElementsByClassName("floating-booking-line")[0].style.marginTop = "-108px";
            document.getElementsByClassName("header")[0].style.top = marginHeight+"px";
        }
    }


    prevScrollpos = currentScrollPos;
}*/


/*
$(window).load(function(){
    $('.client-story-list').mCustomScrollbar({axis:"x"});
})*/

function scrollBarWidth(){
    const body = document.querySelector("body");
    const scrollbar = window.innerWidth - body.clientWidth;
    body.setAttribute("style", `--scrollbar: ${scrollbar}px`);


    /*const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }*/

}

function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function init() {
    console.log('init map')


    var zoomer = 14;
    var coord = document.getElementById('map').getAttribute('data-center');
    var u_pos = coord.split(',');
    myMap = new ymaps.Map("map",
        {
            center: [u_pos[1], u_pos[0]],
            zoom: zoomer,
            controls: ["geolocationControl", "zoomControl"],
            type: "yandex#map"
        },
        {
            minZoom: 10,
            maxZoom: 18,
        }
    );
    myMap.behaviors.disable('scrollZoom');

    myMap.geoObjects
        .add(new ymaps.Placemark([u_pos[1], u_pos[0]], {
            balloonContent: 'Corpsoft24'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/local/templates/main/tpl/img/icon/map-point.svg',
            iconImageSize: [56, 72],
            iconImageOffset: [-23, -36]

            // preset: 'islands#icon',
            // iconColor: '#1F0F63'
        }))

}


function copyToClipboard(elementId) {

    // Create a "hidden" input
    var aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);

    alert("Ссылка скопирована в буфер обмена")
}


