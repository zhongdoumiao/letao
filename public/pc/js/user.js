/**
 * Created by 种豆苗 on 2018/1/13.
 */
$(function(){
    var page = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                var data = template("tpl", info);
                $("tbody").html(data);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total / info.size),
                    numberOfPages:5,
                    onPageClicked:function(a, b,c,p){
                        page = p;
                        render();
                    }
                })
            }
        })
    }
    //禁用模态框
    $("tbody").on("click",".btn",function(){
        $("#userModal").modal("show");
        var  id  = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        $(".btn_confirm").off().on("click",function(){
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    if(info.success){
                        $("#userModal").modal('hide');
                        render();
                    }
                }
            });
        })
    })

});