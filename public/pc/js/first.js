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
            url:"/category/queryTopCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                var data = template("tpl",info);
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
});