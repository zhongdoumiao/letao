/**
 * Created by 种豆苗 on 2018/1/11.
 */
$(function(){
    //二级菜单显示隐藏功能
    $(".aside .classify").prev().on("click",function(){
        $(this).siblings().slideToggle();
    });
    //
});