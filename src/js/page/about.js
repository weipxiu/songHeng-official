!(function() {
  function App() {}
  App.prototype = {
    name: 'About',
    init: function() {
      //fullpage滑块
      var swiper = new Swiper('.swiper-fullpage', {
        direction: 'vertical',
        speed:500,
        mousewheelControl : true,
        onSlideChangeStart: function(swiper) {
          //select.slideTo(0, 0, false);
          if (swiper.activeIndex != 0) {
            $(".logo img").attr("src","./img/common/logo2.png");
            $(".swiper-header .list").addClass("list-active");
          } else{
            $(".logo img").attr("src","./img/common/logo1.png");
            $(".swiper-header .list").removeClass("list-active");
            $(".line-bottom").hide();
          }
        },
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
          swiperAnimateCache(swiper); //隐藏动画元素 
          swiperAnimate(swiper); //初始化完成开始动画
        }, 
        onSlideChangeEnd: function(swiper){ 
          swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
          $('.swiper-fullpage .swiper-wrapper').children().eq(swiper.activeIndex).find('.ani').removeClass('ani');
          $('.swiper-fullpage .swiper-wrapper').children().eq(0).find('.ani').removeClass('ani').css("visibility","visible");

          if(swiper.activeIndex !=0){
            $(".line-bottom").show();
            $(".swiper-header .list span").css("background","#333333")
          }else{
            $(".line-bottom").hide();
            $(".swiper-header .list span").css("background","#ffffff")
          }
          // if(swiper.activeIndex == 2){
          //   select.slideTo(4, 500, false);
          //   $(".select .item").eq(4).addClass("select-active").siblings().removeClass('select-active');
          //   var html = '';
          //   var list = developmentList[4].news.split(',');
          //   for(var i=0;i<list.length;i++){
          //     html+="<li>"+list[i]+"</li>";
          //   }
          //   $(".news-detail .list").html(html);
          // }
          if(swiper.activeIndex){
            slide.slideTo(0, 0, false);
            slide.prevButton.attr("src","./img/common/index_jt_zuohui.png");
            slide.nextButton.attr("src","./img/common/index_jt_youhei.png");
          }
        }
      });
      
      // 第三页滑块
      $(".swiper-page-three .section .swiper-select .content .bar ul li").mouseover(function(){
        $index = $(this).index();
        $(this).addClass('active').siblings('li').removeClass('active');
        $(".swiper-page-three .section .swiper-select .content .box_text ul").eq($index).show().siblings('ul').hide();
      })
      // var select = new Swiper('.swiper-select', {
      //   direction: 'vertical',
      //   mousewheelControl : true,
      //   onSlideChangeStart: function(){ 
      //     alert(1)
      //   } 
      // });

      
      // 管理团队-选项卡
      $(".swiper-page-four .section .section_body .briefIn ul li").mouseover(function(){
        var index = $(this).index();
        $(".swiper-page-four .switch,.photo img").hide();
        $(".swiper-page-four .switch").eq(index).show();
        $(".swiper-page-four .photo img").eq(index).show();

        $(".swiper-page-four .briefIn ul li em").css("opacity","0");
        $(".swiper-page-four .briefIn ul li").eq(index).find('em').css("opacity","1");
      })

      // 第四页滑块
      var team = new Swiper('.swiper-team', {
        loop : true,
        effect: 'coverflow',
        prevButton:'.team-left',
        nextButton:'.team-right',
        slidesPerGroup : 2,
        slidesPerView : 2,
        grabCursor: true,
        spaceBetween : 12,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 0,// 旋转的角度
          stretch:0,// 拉伸   图片间左右的间距和密集度
          depth: 80,// 深度   切换图片间上下的间距和密集度
          modifier: 3,// 修正值 该值越大前面的效果越明显
          slideShadows : false// 页面阴影效果
        }
      });

      //第五页滑块
      var slide = new Swiper('.swiper-container-slide', {
        slidesPerView : 3,
        spaceBetween : 20,
        prevButton: '.arrow-left',
        nextButton: '.arrow-right',
        onSlideChangeEnd:function(slide) {
          if(slide.activeIndex!=0){
            slide.prevButton.attr("src","./img/common/index_jt_zuohei.png");
          }else{
            slide.prevButton.attr("src","./img/common/index_jt_zuohui.png");
          }
          if(slide.activeIndex+3>=$(".swiper-container-slide .item").length){
            slide.nextButton.attr("src","./img/common/index_jt_youhui.png");
          }else{
            slide.nextButton.attr("src","./img/common/index_jt_youhei.png");
          }
        }
      });
      // 第五屏左右箭头hover事件
      $(".arrow-left").hover(function(e){
        if(slide.activeIndex!=0){
          $(this).attr("src","./img/common/index_jt_zuohong.png");
        }        
      },function(){
        if(slide.activeIndex!=0){
          $(this).attr("src","./img/common/index_jt_zuohei.png");
        }else{
          $(this).attr("src","./img/common/index_jt_zuohui.png");
        }
      });

      // 第五屏左右箭头hover事件
      $(".arrow-right").hover(function(e){
        if(slide.activeIndex+3<$(".swiper-container-slide .item").length){
          $(this).attr("src","./img/common/index_jt_youhong.png");
        }        
      },function(){
        if(slide.activeIndex+3<$(".swiper-container-slide .item").length){
          $(this).attr("src","./img/common/index_jt_youhei.png");
        }else{
          $(this).attr("src","./img/common/index_jt_youhui.png");
        }
      });

      //二级导航跳转
      if(this.getQueryString('index')){
        swiper.slideTo(this.getQueryString('index'), 500, false);
        this.changeStyle(this.getQueryString('index'));
        swiperAnimate(swiper);
        if(this.getQueryString('index') == 2){
          //.slideTo(4, 500, false);
          $(".select .item").eq(4).addClass("select-active").siblings().removeClass('select-active');
          var html = '';
          var list = developmentList[4].news.split(',');
          for(var i=0;i<list.length;i++){
            html+="<li>"+list[i]+"</li>";
          }
          $(".news-detail .list").html(html);
        }
        if(swiper.activeIndex !=0){
          $(".line-bottom").show();
          $(".swiper-header .list span").css("background","#333333")
        }else{
          $(".line-bottom").hide();
          $(".swiper-header .list span").css("background","#ffffff")
        }
      }
    },
    //获取url里面参数
    getQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    //改变顶部header样式
    changeStyle: function(index){
      if (index != 0) {
        $(".logo img").attr("src","./img/common/logo2.png");
        $(".swiper-header .list").addClass("list-active");
        $(".footer img").attr("src","./img/common/index_mouse2.png");
        if(index == 4){
          $(".footer").hide();
        }else{
          $('.footer').show();
        }
      } else{
        $(".logo img").attr("src","./img/common/logo1.png");
        $(".swiper-header .list").removeClass("list-active");
        $(".footer img").attr("src","./img/common/index_mouse1.png");
      }
    }
  };

  // 
  $(function() {
    var app = new App();
    app.init();
  });
})();
