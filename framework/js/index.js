// loading
window.onload = function () {
    $(".loading").fadeOut();
}

// 侧边客服
$('.customerService').hide();
$('.customerServiceShow').hide();
$(document).on('click', '.customerService', function () {
    // $(this).hide();
    $(this).hide(500, function () {
        $(this).animate({right: -60}, 3000);
    });
    $('.customerServiceShow').show(500, function () {
        $(this).animate({width: 120, height: 240}, 3000);
    });

});


$('#accordion .navbar-collapse .navbar-nav li').mouseover(function () {
    var index = $(this).attr('href');
    $(this).find(index).slideDown();
    $(this).find('b').addClass('rotate180')
    // $(this).find(index).addClass('shadowNav')
    // $(this).parent('li').addClass('nav-li-bg')
})
$('#accordion .navbar-collapse .navbar-nav li').mouseleave(function () {
    var index = $(this).attr('href');
    $(this).find(index).hide();
    $(this).find('b').removeClass('rotate180')

})


// 轮播
function doAnimations(elems) {
    var animEndEv = 'webkitAnimationEnd animationend';
    elems.each(function () {
        var $this = $(this),
            $animationType = $this.data('animation');
        $this.addClass($animationType).one(animEndEv, function () {
            $this.removeClass($animationType);
        });
    });
}
var $firstAnimatingElems = $('#indexCarousel').find('.item:first')
    .find('[data-animation ^= "animated"]');

doAnimations($firstAnimatingElems);

$('#indexCarousel').carousel('pause');


$('#indexCarousel').on('slide.bs.carousel', function (e) {
    // Select the elements to be animated inside the active slide
    var $animatingElems = $(e.relatedTarget)
        .find("[data-animation ^= 'animated']");
    doAnimations($animatingElems);
});

$('#indexCarousel').find('.left').hide();
$('#indexCarousel').find('.right').hide();
$('#indexCarousel').hover(function () {
    $(this).find('.left').fadeIn();
    $(this).find('.right').fadeIn();
});
$('#indexCarousel').mouseleave(function () {
    $(this).find('.left').fadeOut();
    $(this).find('.right').fadeOut();
});

// 轮播2-解决方案
var $firstAnimatingElems2 = $('#indexCarousel2').find('.item:first')
    .find('[data-animation ^= "animated"]');

doAnimations($firstAnimatingElems2);

$('#indexCarousel2').carousel('pause');


$('#indexCarousel2').on('slide.bs.carousel', function (e) {
    // Select the elements to be animated inside the active slide
    var $animatingElems = $(e.relatedTarget)
        .find("[data-animation ^= 'animated']");
    doAnimations($animatingElems);
});

// 视频
$('.vp-wrap').hide();
$('.vp-wrap-close').hide();
$('#play').click(function () {
    $('.vp-wrap').fadeIn();
    $('#videoEle')[0].play();
    $('.vp-wrap-close').show();
})
$('.vp-wrap-close').click(function () {
    $('.vp-wrap').fadeOut();
    $(this).hide();
    $('#videoEle')[0].pause();
})

// 解决方案 imgscale
$('.solution-imgScale-wrap img').hover(function () {
    $(this).removeClass('imgplayout');
    $(this).addClass('imgplay');
})
$('.solution-imgScale-wrap img').mouseleave(function () {
    $(this).removeClass('imgplay');
    $(this).addClass('imgplayout');
});

$('.operationPerson-service ul li ').hover(function () {
    $(this).find('.operationPerson-service-span').addClass('hchange');
    $(this).find('.operationPerson-service-span').removeClass('hchange2');
})
$('.operationPerson-service ul li ').mouseleave(function () {
    $(this).find('.operationPerson-service-span').removeClass('hchange');
    $(this).find('.operationPerson-service-span').addClass('hchange2');
})


$('.operationsCourse-service ul li ').hover(function () {
    $(this).find('.operationsCourse-service-span').addClass('hchange3');
    $(this).find('.operationsCourse-service-span').removeClass('hchange4');
})
$('.operationsCourse-service ul li ').mouseleave(function () {
    $(this).find('.operationsCourse-service-span').removeClass('hchange3');
    $(this).find('.operationsCourse-service-span').addClass('hchange4');
})


// 加入我们
$('.joinUs-nav ul li').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var ind = $(this).attr('idfor');
    $(this).parents(2).find('.joinUs-cont').hide();
    $(this).parents(2).find('#' + ind).fadeIn();
    // $('html,body').animate({scrollTop: '0px'}, 800);
});
//运营课程
$('.course-tab ul li').click(function () {
    $(this).siblings().removeClass('active-tab');
    $(this).addClass('active-tab');
    var ind = $(this).attr('idfor');
    $(this).parents(2).find('.course-cont').hide();
    $(this).parents(2).find('#' + ind).fadeIn();
    // $('html,body').animate({scrollTop: '0px'}, 800);
});
// 回到顶部
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 550) {
            $('.gototop').fadeIn(300);
        } else {
            $('.gototop').fadeOut(300);
        }
    });
    $('.gototop').click(function () {
        $('html,body').animate({scrollTop: '0px'}, 800);
    });
});
/*提交成功*/
$(function () {
    $("#submit-suc").click(function () {
        $("#formT").hide();
        $(".fade").css("display", "none");
        $(".signIn-suc").slideDown(1000);
        window.setTimeout(hide, 3000);
    })
});

function hide() {
    $(".signIn-suc").slideUp();
}