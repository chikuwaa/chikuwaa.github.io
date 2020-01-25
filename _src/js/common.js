$(function(){
    var is_animated = false;
    var current_posi = "top";
    var position = $(window).height() / 2;  // 発火させたい位置
    var top = $('.light').offset().top - position;
    var l_top;
    var l_skills;
    var l_price;
    var l_contact;
    // var position = top - ( $(window).height() / 2 );  // 発火させたい位置

    //スムーススクロール
    $('a[href^="#"]').click(function(){
        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });


    $(window).scroll(function(){
        //スクロールアニメーション
        if( $(window).scrollTop() > top ){
            // console.log("a");
            if( is_animated != true){
                $('body').css("overflow","hidden");
                setTimeout(function(){
                    is_animated = true;
                    $('body').addClass("on");

                },1000);
                setTimeout(function(){
                    $('body').css("overflow","");
                    $('.light .off').css("display","none");
                    $('.light .on').css("display","block");
                    $('.light h1').css("display","inherit");
                    $(window).scrollTop(0);
                   
                },2000);
            }
            
        }else{
            // console.log("b");
        }

        //current移動
        if( is_animated == true){
            // console.log("a");
            l_top = $('#top').offset().top  - position;
            l_skills = $('#skills').offset().top - position;
            l_price = $('#price').offset().top - position;
            l_contact = $('#contact').offset().top - position;

            if( $(window).scrollTop() > l_top && $(window).scrollTop() < l_skills ){
                // console.log("b");
                $('header .current').removeClass("skl price con");
            }else if( $(window).scrollTop() > l_skills && $(window).scrollTop() < l_price ){
                // console.log("b");
                $('header .current').removeClass("skl price con");
                $('header .current').addClass("skl");
            }else if( $(window).scrollTop() > l_price && $(window).scrollTop() < l_contact ){
                $('header .current').removeClass("skl price con");
                $('header .current').addClass("price");
            }else if( $(window).scrollTop() > l_contact ){
                $('header .current').removeClass("skl price con");
                $('header .current').addClass("con");
            }
        }
        
    });
});

