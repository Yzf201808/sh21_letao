/**
 * Created by Administrator on 2018/6/25 0025.
 */

//添加进度条功能 nprogress.js 所有的ajax都添加


// 5. 如果当前用户没有登录, 需要拦截到登陆页面
//    前端是不知道用户是否登陆了的, 但是后台知道, 想知道, 问后台, (访问后台接口即可)
//    注意: 需要将登录页, 排除在外面, 就是登录页可以不登录就访问的

if(location.href.indexOf('login.html') == -1) {
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function(info){
      if ( info.error === 400 ) {
        // 当前用户没登陆, 拦截到登陆页
        location.href = "login.html";
      }

      if ( info.success ) {
        // 当前用户已登录, 不需要拦截, 啥事都不用干, 让用户访问页面
        console.log( "当前用户已登陆" );
      }
    }
  })
}


//发送ajax 开启进度条，ajax结束，关闭进度条
//要给ajax进度条事件增加全局



//开启进度条
//NProgress.start();
//
////关闭进度条
//setTimeout(function(){
//  NProgress.done();
//},2000);
$(function(){
//  1 开启进度条
  $(document).ajaxStart(function(){
    NProgress.start();
  })


//关闭进度条
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },3000);
  })


//  公共功能
//  1、二级菜单的显示与隐藏
  $('.nav .category').on("click",function(){
    $('.child').stop().slideToggle();
  })

  // 2. 左侧整个侧边栏显示隐藏功能
  $('.lt-topbar .icon-menu').on("click",function(){
     $('.lt-aside').toggleClass('hiddenMenu');
    $('.lt-topbar').toggleClass("hiddenMenu");
    $('.lt-mian').toggleClass("hiddenMenu");

  })
//  3、点击按钮弹出模态框
  $(".lt-topbar .icon-loginout").on("click",function(){
    $("#loginModal").modal("show");
  })

// 4. 点击模态框中的退出按钮, 需要进行退出操作(ajax)
  $('.btn-loginout').on("click",function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
      console.log(info);
        if(info.success) {
          location.href="login.html";
        }
      }
    })
  })
})
