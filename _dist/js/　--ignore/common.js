"use strict";

var _smoothscrollPolyfill = _interopRequireDefault(require("smoothscroll-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

$(function () {
  var is_animated = false;
  var top = $('.light').offset().top;
  var position = top - $(window).height() / 2; // 発火させたい位置

  $(window).scroll(function () {
    if ($(window).scrollTop() > position) {
      // 要素が見えたときの動き 
      console.log("a");

      if (is_animated != true) {
        $('body').css("overflow", "hidden");
        setTimeout(function () {
          is_animated = true;
          $('body').addClass("on");
        }, 1000);
        setTimeout(function () {
          $('body').css("overflow", "");
          $('.light .off').css("display", "none");
          $('.light .on').css("display", "block");
          $('.light h1').css("display", "inherit");
          $(window).scrollTop(0);
        }, 2000);
      }
    } else {
      // それ以外の動き
      console.log("b");
    }
  });
}); //スムーススクロール

// kick off the polyfill!
_smoothscrollPolyfill["default"].polyfill();

document.addEventListener("click", function (e) {
  var target = e.target; // clickした要素がclass属性、js-smooth-scrollを含まない場合は処理を中断

  if (!target.classList.contains("js-smooth-scroll")) return;
  e.preventDefault();
  var targetId = target.hash;
  document.querySelector(targetId).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});