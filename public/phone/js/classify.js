/**
 * Created by 种豆苗 on 2018/1/15.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        success:function(info){
            console.log(info);
            var data = template("l-main-tpl", info);
            $(".l-main ul").html(data);
            secondRender(info.rows[0].id)
        }
    });
    function secondRender(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $(".r-main ul").html( template("r-main-tpl", info) );
            }
        })
    }
    //点击切换
    $(".l-main ul").on("click","li",function(){
        //alert(666)
        $(this).addClass("now").siblings().removeClass("now");
        var id = $(this).data("id");
        secondRender(id);
    })
});