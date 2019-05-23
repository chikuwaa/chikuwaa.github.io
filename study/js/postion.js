(function(){
  //スクロール量(ネイティブJS)
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //boxの位置取得(ネイティブJS)
  const box01 = document.getElementsByClassName('box01');
  let rect01 = box01[0].getBoundingClientRect();
  const box02 = document.getElementsByClassName('box02');
  let rect02 = box02[0].getBoundingClientRect();
  const win_center = document.getElementsByClassName('win_center');
  const win_center_p = win_center[0].getBoundingClientRect();
  //画面の高さ取得
  const winH = $(window).height();
  //画面の高さ半分
  const harfH = winH / 2 ;

  $('.win_center').css('top',harfH);
  $('.box01').text("top: "+ (rect01.top + scrollTop) + " left: "+ rect01.left);
  $('.box02').text("top: "+ (rect02.top + scrollTop) + " left: "+ rect02.left);

  //box02のトップ位置から表示位置までの移動量を計算
  rect02 = rect02.top + scrollTop;
  let box02_flg = rect02 - harfH;
  // console.log("半分線初期位置 : "+harfHline);
  // console.log("box02 移動量 : "+box02_flg);

  let harfHline = $('.win_center').offset().top;
  window.addEventListener('scroll', () => {
    //中央線の表示
    scrollTop = $(window).scrollTop();
    harfHline = (harfH + scrollTop);
    $('.win_center').css('top',harfHline);

    //動きのcss付与
    if(scrollTop > box02_flg){
      $('.box02').addClass('on');
    }else{
      $('.box02').removeClass('on');
    }
  }, false);
})();
