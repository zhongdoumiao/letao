/**
 * Created by 种豆苗 on 2018/1/13.
 */
$(function(){
    var page = 1;
    var pageSize = 2;
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
    //让添加模态框显示
    $(".btn_add").on("click",function(){
        //alert(666)
        $("#addModal").modal("show");
    });
    //做表单校验功能
    var form = $("form");
    form.bootstrapValidator({
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类不能为空'
                    }
                }
            }
        }
    });
    form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data: form.serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#addModal").modal("hide");
                    page=1;
                    render();
                    form.data("bootstrapValidator").resetForm(true);
                }
            }

        })
    });
});