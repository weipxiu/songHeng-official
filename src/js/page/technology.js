!(function() {
  function App() {}
  App.prototype = {
    name: 'About',
    init: function() {
      var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl : true,
        speed:500,
        onSlideChangeStart: function(swiper){
          if (swiper.activeIndex != 0) {
            $(".logo img").attr("src","./img/common/logo2.png");
            $(".swiper-header .list").addClass("list-active");
            $(".footer img").attr("src","./img/common/index_mouse2.png");
            $(".swiper-header .list span").css("background","#333333")
            if(swiper.activeIndex == 2){
              $(".footer").hide();
            }else{
              $('.footer').show();
            }
          } else{
            $(".logo img").attr("src","./img/common/logo1.png");
            $(".swiper-header .list").removeClass("list-active");
            $(".footer img").attr("src","./img/common/index_mouse1.png");
            $(".swiper-header .list span").css("background","#ffffff")
          }
        },
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
          swiperAnimateCache(swiper); //隐藏动画元素 
          swiperAnimate(swiper); //初始化完成开始动画
        }, 
        onSlideChangeEnd: function(swiper){ 
          swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
          $('.swiper-container .swiper-wrapper').children().eq(swiper.activeIndex).find('.ani').removeClass('ani');
          $('.swiper-container .swiper-wrapper').children().eq(0).find('.ani').removeClass('ani').css("visibility","visible");
          if(swiper.activeIndex!=0){
            $(".line-bottom").show();
          }else{
            $(".line-bottom").hide();
          }
        } 
      });
      //二级导航跳转
      if(this.getQueryString('index')){
        //alert(this.getQueryString('index'))
        swiper.slideTo(this.getQueryString('index')-1, 500, false);
        swiperAnimate(swiper);
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
