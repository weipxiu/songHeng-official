!(function() {
  function App() {}
  App.prototype = {
    name: 'Index',
    init: function() {
      //首页视频loading
      // $('#vi').on('canplay', function() {
      //   $('#loading').hide();
      //   $('#vi, .swiper-video .img').show();
      // });

      // 判断浏览器类型
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        $('.video-player').css('height', 'auto');
      }
      if (navigator.userAgent.indexOf('Edge') > -1) {
        $('#vi').css('height', 'auto');
        // setTimeout(function() {
        //   $('#loading').hide();
        //   $('#vi,.swiper-video .img').show();
        // }, 2000);
      }

      // fullpage
      var swiper = new Swiper('.swiper-fullpage', {
        direction: 'vertical',
        speed: 500,
        mousewheelControl: true,
        onSlideChangeStart: function(swiper) {
          if (swiper.activeIndex == 0 || swiper.activeIndex == 3) {
            $('.mouse').show();
            $('.logo img').attr('src', './img/common/logo1.png');
            $('.tabs .line').css('background', '#ffffff');
            $('.footer').css('color', '#c1c1c1');
            $('.home-icon span').css('background', '#ffffff');
            if (swiper.activeIndex == 3) {
              $('.home-icon').hide();
            }
          } else if (swiper.activeIndex == 1 || swiper.activeIndex == 2) {
            $('.home-icon').show();
            $('.logo img').attr('src', './img/common/logo2.png');
            $('.tabs .line').css('background', '#474747');
            $('.footer').css('color', '#747474');
            $('.home-icon span').css('background', '#999999');
          }
        },
        onInit: function(swiper) {
          //Swiper2.x的初始化是onFirstInit
          swiperAnimateCache(swiper); //隐藏动画元素
          swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper) {
          swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

          $('.swiper-fullpage')
            .children('.swiper-wrapper')
            .children()
            .eq(swiper.activeIndex)
            .find('.ani')
            .removeClass('ani');

          banner.slideTo(0, 0, false);
          banner.prevButton.attr('src', './img/common/index_jt_zuohui.png');
          banner.nextButton.attr('src', './img/common/index_jt_youhei.png');
          if (banner.activeIndex + 3 >= $('.swiper-banner .item').length) {
            $('.content-arrow-right').attr(
              'src',
              './img/common/index_jt_youhui.png'
            );
          }
        }
      });

      // 第二屏banner
      var banner = new Swiper('.swiper-banner', {
        slidesPerView: 3,
        spaceBetween: 20,
        prevButton: '.content-arrow-left',
        nextButton: '.content-arrow-right',
        onSlideChangeEnd: function(banner) {
          if (banner.isBeginning) {
            banner.prevButton.attr('src', './img/common/index_jt_zuohui.png');
          } else {
            banner.prevButton.attr('src', './img/common/index_jt_zuohei.png');
          }
          if (banner.activeIndex + 3 >= $('.swiper-banner .item').length) {
            banner.nextButton.attr('src', './img/common/index_jt_youhui.png');
          } else {
            banner.nextButton.attr('src', './img/common/index_jt_youhei.png');
          }
        }
      });

      // 第二屏左右箭头hover事件
      $('.content-arrow-left').hover(
        function(e) {
          if (banner.activeIndex != 0) {
            $(this).attr('src', './img/common/index_jt_zuohong.png');
          }
        },
        function() {
          if (banner.activeIndex != 0) {
            $(this).attr('src', './img/common/index_jt_zuohei.png');
          } else {
            $(this).attr('src', './img/common/index_jt_zuohui.png');
          }
        }
      );

      // 第二屏左右箭头hover事件
      $('.content-arrow-right').hover(
        function(e) {
          if (banner.activeIndex + 3 < $('.swiper-banner .item').length) {
            $(this).attr('src', './img/common/index_jt_youhong.png');
          }
        },
        function() {
          if (banner.activeIndex + 3 < $('.swiper-banner .item').length) {
            $(this).attr('src', './img/common/index_jt_youhei.png');
          } else {
            $(this).attr('src', './img/common/index_jt_youhui.png');
          }
        }
      );

      // 右上角导航页
      $('.tabs').hover(function() {
        $('.mask').css({ right: '0', top: '0', transform: 'scale(3)' });
        $('.menus')
          .delay(400)
          .fadeIn(500);
      });
      $('.cover').mouseout(function() {
        setTimeout(function() {
          $('.cover').hide();
        }, 300);
      });
      $('.close').click(function() {
        $('.mask').css({ transform: 'scale(1)', right: '-100%', top: '-100%' });
        $('.menus').hide();
        $('.cover').show();
      });
    }
  };

  $(function() {
    var app = new App();
    app.init();
  });
})();
