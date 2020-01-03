(function(){
  var scrollAnimationElm = document.querySelectorAll('.graph');
  var scrollAnimationFunc = function() {
    for(var i = 0; i < scrollAnimationElm.length; i++) {
      if (window.innerHeight < 820){
        var triggerMargin = 100;
      }else{
        var triggerMargin = 300;
      }
      if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
        scrollAnimationElm[i].classList.add('on');
      }
    }
  }
  window.addEventListener('load', scrollAnimationFunc);
  window.addEventListener('scroll', scrollAnimationFunc);

  $('.skill_tab li').click(function(){
    var this_tab = $(this).attr("class");

    $('.skill_tab li span').removeClass("on");
    $('.skill_tab .' + this_tab +' span').addClass("on");

    $('.skill_box_out .skill-box').css('display','none');
    $('.skill_box_out .skill-box .graph').removeClass("on");
    $('.skill_box_out .' + this_tab).css('display','block');
    scrollAnimationFunc();
  })
})();
