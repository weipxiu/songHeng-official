(function() {
  function App() {}
  App.prototype = {
    name: 'Join',
    init: function() {
      var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        speed:500,
        paginationClickable: true,
        mousewheelControl: true,
        onInit: function (mySwiper) {
          swiperAnimateCache(mySwiper)
          swiperAnimate(mySwiper)
        },
        onSlideChangeEnd: function(mySwiper){ 
          swiperAnimate(mySwiper); //每个slide切换结束时也运行当前slide动画
          $('.swiper-container .swiper-wrapper').children().eq(mySwiper.activeIndex).find('.ani').removeClass('ani');
          $('.swiper-container .swiper-wrapper').children().eq(0).find('.ani').removeClass('ani').css("visibility","visible");
        }
      });
      if(this.getQueryString('index')){
        mySwiper.slideTo(this.getQueryString('index'), 500, false);
        swiperAnimate(mySwiper)
      }
    },
    //获取url里面参数
    getQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
    }
  };

  $(function() {
    var app = new App();
    app.init();
  });
})();
