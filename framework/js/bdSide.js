$(function(){
    $(window).scroll(function() {
        var scrollY = $(document).scrollTop();
        // 导航滚动变色
        if (scrollY > 10){
            $('.customerService').fadeIn();

        }
        else {
            $('.customerService').fadeOut();

        }

        // if (scrollY > 400){
        //     $('.index-nav').removeClass('navbar-inverse');
        //     $('.index-nav').addClass('bgf');
        //     $('.navbar-nav li .afix').css(
        //         {
        //             color:'#333'
        //         }
        //     )
        // }
        // else {
        //     $('.index-nav').removeClass('bgf');
        //     $('.index-nav').addClass('navbar-inverse');
        //     $('.navbar-nav li .afix').css(
        //         {
        //             color:'#fff'
        //         }
        //     )
        // }


    });
});