/**
 * Created by 种豆苗 on 2018/1/11.
 */
$(function(){
    //进度条功能
    //NProgress.configure({ showSpinner: false });//关闭进度环
    $(document).ajaxStart(function(){
        NProgress.start();
    });

    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 1000);
    });
    //二级菜单显示隐藏功能
    $(".aside .classify").prev().on("click",function(){
        $(this).siblings().slideToggle();
    });
    //检测登陆
    if(location.href.indexOf("login.html") == -1){
        $.ajax({
            type:"get",
            url:"/employee/checkRootLogin",
            success:function (info) {
                if(info.error == 400){
                    //说明没有登录，
                    location.href = "login.html";
                }
            }
        });
    }
    //收起侧边栏
    $(".icon_menu").on("click",function(){
        console.log(666);
        $(".aside").toggleClass("now");
        $(".main").toggleClass("now")
    })
});