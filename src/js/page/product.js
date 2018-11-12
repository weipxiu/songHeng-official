!(function() {
  function App() {}
  App.prototype = {
    name: 'Product',
    init: function() {
      //fullpage滑动
      var bannerList=[
        {src:"./img/common/product_applogo_dftt.png",name:"东方头条",cont:"一款基于用户阅读兴趣智能推荐的新闻资讯聚合APP。多次蝉联中国新闻网站App传播力月榜No.1，2017年入选“上海市民信息消费推荐APP”"},
        {src:"./img/common/product_applogo_hbtt.png",name:"河北头条",cont:"新技术与区域传统媒体的深度合作，内容下沉，贴近民生"}
      ];
      var bannerIndex=0;
      var swiper = new Swiper('.swiper-fullpage', {
        direction: 'vertical', 
        speed:500,
        mousewheelControl : true,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
          swiperAnimateCache(swiper); //隐藏动画元素 
          swiperAnimate(swiper); //初始化完成开始动画
        }, 
        onSlideChangeEnd: function(swiper){ 
          swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
          $('.swiper-fullpage .swiper-wrapper').children().eq(swiper.activeIndex).find('.ani').removeClass('ani');
          $('.swiper-fullpage .swiper-wrapper').children().eq(0).find('.ani').removeClass('ani').css("visibility","visible");
        } 
      });

      //第二页轮播
      var banner = new Swiper('.swiper-banner', {
        //pagination : '.swiper-pagination-banner',
        paginationType : 'custom',
        // paginationClickable: true,
        paginationCustomRender: function (swiper, current, total) {
          var customPaginationHtml = "";
          for(var i = 0; i < total; i++) {
            //判断哪个分页器此刻应该被激活
            if(i == (current - 1)) {
              customPaginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
            } else {
              customPaginationHtml += '<span class="swiper-pagination-customs"></span>';
            }
          }
          return customPaginationHtml;
        }
      });

      // 第三页轮播
      var product = new Swiper('.swiper-product', {
        pagination : '.swiper-pagination-product',
        paginationType : 'custom',
        // paginationClickable: true,
        paginationCustomRender: function (swiper, current, total) {
          var customPaginationHtml = "";
          for(var i = 0; i < total; i++) {
            //判断哪个分页器此刻应该被激活
            if(i == (current - 1)) {
              customPaginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
            } else {
              customPaginationHtml += '<span class="swiper-pagination-customs"></span>';
            }
          }
          return customPaginationHtml;
        }
      });

      //二级导航跳转
      if(this.getQueryString('index')){
        //alert(this.getQueryString('index'))
        swiper.slideTo(this.getQueryString('index')-1, 500, false);
        swiperAnimate(swiper);
      }

    
      $(".pc-logo .item").hover(function() {
        var src = $(this).find('.logo').attr('src');
        var start = src.lastIndexOf('_')+1;
        var end = src.lastIndexOf('.');
        var name = src.substring(start,end).substring(0,src.substring(start,end).length-1);
        $(this).find('.logo').attr('src',src.substring(0,start)+name+src.substring(end));          
        $(this).find(".produce").fadeIn(200);
        $(this).find('.arc').attr("src","./img/common/product_pcyq_select.png");
      },function() {
        var list = $(this).parent().find('.logo');
        var start,end,appName,name;
        for(var i=0;i<list.length;i++){
          start = list[i].src.lastIndexOf('_')+1;
          end = list[i].src.lastIndexOf('.');
          appName = list[i].src.substring(start,end);
          if(appName.indexOf('1')<0){
            list[i].src = list[i].src.substring(0,start)+appName+'1'+list[i].src.substring(end);
          }
        }
        $(this).find(".produce").fadeOut(200);
        $(this).find('.arc').attr("src","./img/common/product_pcyq_default.png");
      });

      //分页器跳转
      $('.swiper-pagination-banner').on('click','span',function(){
        console.log(bannerList)
        var index = $(this).index();
        bannerIndex = index;
        banner.slideTo(index, 500, false);//切换到第一个slide，速度为1秒
        $(".swiper-page-two").find(".head img").attr("src",bannerList[bannerIndex].src);
        $(".swiper-page-two").find(".head h2").html(bannerList[bannerIndex].name);
        $(".swiper-page-two").find(".head p").html(bannerList[bannerIndex].cont);
      });

      $('.swiper-pagination-product').on('click','span',function(){
        var index = $(this).index();
        product.slideTo(index, 500, false);//切换到第一个slide，速度为1秒
      });

      // app
      $(".banner-slide .item img").hover(function(e){
        var list = $(this).parents('.banner-slide').find('img');
        var start,end,appName,name;
        for(var i=0;i<list.length;i++){
          start = list[i].src.lastIndexOf('_')+1;
          end = list[i].src.lastIndexOf('.');
          appName = list[i].src.substring(start,end);
          if(appName.indexOf('1')<0){
            list[i].src = list[i].src.substring(0,start)+appName+'1'+list[i].src.substring(end);
          }
        }
        start = e.target.src.lastIndexOf('_')+1;
        end = e.target.src.lastIndexOf('.');
        name = e.target.src.substring(start,end).substring(0,e.target.src.substring(start,end).length-1);
        if(name == 'difang'){
          $(".swiper-page-two").find(".head img").addClass('especially')
        }else{
          $(".swiper-page-two").find(".head img").removeClass('especially')
        }
        if(name=='mp'||name=='dfty'||name=='mpsp'){
          $(".swiper-page-two").find(".head p").css('text-align','center')
        }else{
          $(".swiper-page-two").find(".head p").css('text-align','left')
        }

        $(this).attr('src',e.target.src.substring(0,start)+name+e.target.src.substring(end));
        $(".swiper-page-two").find(".head img").attr("src",e.target.src.substring(0,start)+name+e.target.src.substring(end-1));
        bannerList[bannerIndex].src=e.target.src.substring(0,start)+name+e.target.src.substring(end-1);
        for(var i=0;i<appList.length;i++){
          if(name == appList[i].name){
            $(".swiper-page-two").find(".head h2").html(appList[i].title);
            $(".swiper-page-two").find(".head p").html(appList[i].cont);
            bannerList[bannerIndex].name=appList[i].title;
            bannerList[bannerIndex].cont=appList[i].cont;
          }
        }
      },function(){})
      
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
