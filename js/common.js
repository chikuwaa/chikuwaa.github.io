(function(){
  $('.skill_tab li').click(function(){
    var this_tab = $(this).attr("class");

    $('.skill_tab li span').removeClass("on");
    $('.skill_tab .' + this_tab +' span').addClass("on");

    $('.skill_box_out .skill-box').css('display','none');
    $('.skill_box_out .' + this_tab).css('display','block');
  })

})();
