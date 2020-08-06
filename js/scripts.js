/*-----------------------------------------------------------------------------------

    Theme Name: Coco
    Theme URI: http://
    Description: The Multi-Purpose Onepage Template
    Author: UI-ThemeZ
    Author URI: http://themeforest.net/user/UI-ThemeZ
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function() {

    "use strict";

    var wind = $(window);



    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',          // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -70            // offste (in px) for fixed top navigation
    });



    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");

        if(bodyScroll > 100){

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');

        }else{

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });


    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });



    // progress bar
    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });



    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    // === owl-carousel === //

    // Testimonials owlCarousel
    $('.carousel-single.owl-carousel').owlCarousel({
        items:1,
        loop:true,
        margin: 0,
        mouseDrag:false,
        autoplay:true,
        smartSpeed:500
    });

    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:true,
        autoplay:true,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });

    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:true,
        autoplay:true,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    // === End owl-carousel === //


    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // YouTubePopUp
    $("a.vid").YouTubePopUp();


});


// === window When Loading === //

$(window).on("load",function (){

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // stellar
    wind.stellar();


    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });

//=========================================================================================
//  11.   Contact Form Validation
//=========================================================================================

if( $('#contact-form').length){
    $('#contact-form').validate({  //#contact-form contact form id
      rules: {
        name: {
          required: true    // Field name here
        },
        email: {
          required: true, // Field name here
          email: true
        },
        subject: {
          required: true
        },
        message: {
          required: true
        }
      },
      
      messages: {
                name: "Please enter your Name", //Write here your error message that you want to show in contact form
                email: "Please enter valid Email", //Write here your error message that you want to show in contact form
                subject: "Please enter your Subject", //Write here your error message that you want to show in contact form
                message: "Please write your Message" //Write here your error message that you want to show in contact form
            },

            submitHandler: function (form) {
                $('#send').attr({ 'disabled': 'true', 'value': 'Sending...' });
                sendEmail(form);
                //$.ajax({
                //    type: "POST",
                //    url: "email.php",
                //    data: $(form).serialize(),
                //    success: function () {
                //        $('#send').removeAttr('disabled').attr('value', 'Send');
                //        $( "#success").slideDown( "slow" );
                //        setTimeout(function() {
                //        $( "#success").slideUp( "slow" );
                //        }, 5000);
                //        form.reset();
                //    },
                //    error: function() {
                //        $('#send').removeAttr('disabled').attr('value', 'Send');
                //        $( "#error").slideDown( "slow" );
                //        setTimeout(function() {
                //        $( "#error").slideUp( "slow" );
                //        }, 5000);
                //    }
                //});
                return false; // required to block normal submit since you used ajax
            }

    });
  }

    // // contact form validator
    // $('#contact-form').validator();

    // $('#contact-form').on('submit', function (e) {
    //     if (!e.isDefaultPrevented()) {
    //         var url = "http://www.innovationplans.com/idesign/coco3/contact.php";

    //         $.ajax({
    //             type: "POST",
    //             url: url,
    //             data: $(this).serialize(),
    //             success: function (data)
    //             {
    //                 var messageAlert = 'alert-' + data.type;
    //                 var messageText = data.message;

    //                 var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
    //                 if (messageAlert && messageText) {
    //                     $('#contact-form').find('.messages').html(alertBox);
    //                     $('#contact-form')[0].reset();
    //                 }
    //             }
    //         });
    //         return false;
    //     }
    // });

});

function sendEmail(form) {
    var data = $(form).serialize();
    
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "softwarepramukh@gmail.com",
        Password: "9CE4E3AE68825885215244F53C80E1251493",
        To: 'info@pramukhsoftware.com',
        From: "softwarepramukh@gmail.com",
        Subject: "Enquiry on Pramukh Software site",
        Body: deparam(data)
    }).then(
        function (x) {
            if (x == "OK") {

                $('#send').removeAttr('disabled').attr('value', 'Send');
                $("#success").slideDown("slow");
                setTimeout(function () {
                    $("#success").slideUp("slow");
                }, 5000);
                form.reset();

            }
            else {
                $('#send').removeAttr('disabled').attr('value', 'Send');
                $("#error").slideDown("slow");
                setTimeout(function () {
                    $("#error").slideUp("slow");
                }, 5000);
            }

        }
    );
}

function deparam(query) {
    var pairs, i, keyValuePair, key, value, map = {};
    // remove leading question mark if its there
    if (query.slice(0, 1) === '?') {
        query = query.slice(1);
    }
    if (query !== '') {
        pairs = query.split('&');
        for (i = 0; i < pairs.length; i += 1) {
            keyValuePair = pairs[i].split('=');
            key = decodeURIComponent(keyValuePair[0]);
            value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
            map[key] = value;
        }
    }
    return map;
}
// Slider 
$(document).ready(function() {

    
    var owl = $('.header .owl-carousel');


    // Slider owlCarousel
    $('.slider .owl-carousel').owlCarousel({
        items: 1,
        loop:true,
        margin: 0,
        autoplay:true,
        smartSpeed:500
    });

    // Slider owlCarousel
    $('.slider-fade .owl-carousel').owlCarousel({
        items: 1,
        loop:true,
        margin: 0,
        autoplay:true,
        smartSpeed:500,
        animateOut: 'fadeOut'
    });

    owl.on('changed.owl.carousel', function(event) {
        var item = event.item.index - 2;     // Position of the current item
        $('h4').removeClass('animated fadeInLeft');
        $('h1').removeClass('animated fadeInRight');
        $('p').removeClass('animated fadeInUp');
        $('.butn').removeClass('animated zoomIn');
        $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInLeft');
        $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInRight');
        $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.butn').addClass('animated zoomIn');
    });

});
