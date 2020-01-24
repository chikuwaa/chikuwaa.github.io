$(function(){
    var is_animated = false;
    var top = $('.light').offset().top;
    var position = top - ( $(window).height() / 2 );  // 発火させたい位置

    $(window).scroll(function(){

        if($(window).scrollTop() > position){
        // 要素が見えたときの動き 
            console.log("a");
            if( is_animated != true){
                $('body').css("overflow","hidden");
                setTimeout(function(){
                    is_animated = true;
                    $('body').addClass("on");

                },1000);
                setTimeout(function(){
                    $('body').css("overflow","");
                },1500);
            }

            
        }else{
        // それ以外の動き
            console.log("b");
        }
    })
});