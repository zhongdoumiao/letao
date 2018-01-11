/**
 * Created by 种豆苗 on 2018/1/11.
 */
$(function(){
    var $form = $("form");
    //console.log($form);
    //使用表单校验插件
    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                //里面可以配置username所有的校验。
                validators:{
                    //非空校验
                    notEmpty:{
                        //提示信息
                        message:"用户名不能为空哦！"
                    },
                    callback:{
                        message:"用户名不存在"
                    }

                }
            },
            password:{
                validators:{
                    //非空校验
                    notEmpty:{
                        message:"用户密码不能为空哦！"
                    },
                    //长度校验
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码必须是6-12位"
                    },
                    //是用于校验失败后，提示的信息
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }

    });
    $form.on('success.form.bv', function (e) {
        //阻止表单验证
        e.preventDefault();
        //console.log(1);
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",///employee/employeeLogin
            data: $form.serialize(),
            success:function(info){
               if(info.success) {
                   location.href = "index.html"
               }
                console.log(info);
               if(info.error == 1000){
                   $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
               }
            }
        })
    });
    $("[type='reset']").on("click", function(){

        //重置表单样式
        $("form").data("bootstrapValidator").resetForm();

    });
    });
