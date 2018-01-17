/**
 * Created by 种豆苗 on 2018/1/16.
 */
$(function(){
   //获取历史记录并且渲染
    function getHistory(){
        var history = localStorage.getItem("lt_search_history") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    function render(){
        var arr = getHistory();
        $(".history").html( template("tpl", {arr:arr}) );
    }
   render();
    //删除历史记录
    $(".history").on("click",".btn_delete",function(){
        var index = $(this).data("index");
        var arr = getHistory();
        arr.splice(index,1);
        localStorage.setItem("lt_search_history",JSON.stringify(arr));
        render();
    });
    //清空历史记录
    $(".history").on("click",".btn_empty",function(){
        mui.confirm("您是否要清空所有的历史记录?", "温馨提示", ["是", "否"],function(e){
            if(e.index == 0){
                localStorage.removeItem("lt_search_history");
                render();
            }
        });
    });
    //添加历史记录
    //首先注册点击事件
    $(".search_btn").on("click",function(){
        console.log("hehe");
        //获取输入的关键字
        var key = $(".search_input").val().trim();
        $(".search_input").val('');
        if(!key){
            mui.toast("请输入搜索关键字");
            return;
        }
        //获取历史记录
        var arr = getHistory();
        //把关键字添加到记录当中
        //添加的时候注意进行一步判断如果已经有了，那么删除
        var index = arr.indexOf(key);
        if(index != -1){
            arr.splice(index,1);
        }
        if(arr.length > 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem("lt_search_history", JSON.stringify(arr));
        render();
        location.href = "searchList.html?key="+ key;
    })
});