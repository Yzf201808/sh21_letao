/**
 * Created by Administrator on 2018/6/25 0025.
 */



$(function(){
  //1、进行表单验证  ---表单验证初始化
  $("#form").bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    //显示此图标时说明所填的数据符合自己所设定的要求，
    // 但是是否满足数据库中数据的表达还需要进一步的进行验证
    feedbackIcons: {
      valid:"glyphicon glyphicon-ok",
      invalid:"'glyphicon glyphicon-remove",
      validating:"glyphicon glyphicon-refresh"
    },
    //指定校验字段
    fields : {
        username:{
          //不能为空
          validators:{
            notEmpty:{message:"用户名不能为空"},
            //  长度校验
            stringLength : {
              min:2,
              max:6,
              message:"用户名的长度必须在2-6之间"
            },
          callback:{
            message:"用户名不存在"
          }
          }
        },
        password:{
        //不能为空
        validators:{
          notEmpty:{message:"密码不能为空"},
          //  长度校验
          stringLength : {
            min:6,
            max:12,
            message:"密码的长度必须在6-12之间"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
      }
  });

  //2、通过ajax提交数据，并验证信息是否正确
  /*
   * 2. 使用 submit 按钮, 进行提交, 表单校验插件, 会在提交时, 进行校验,
   *    (1) 如果校验成功, 会默认提交这次请求, 会进行跳转, 我们需要阻止这次提交, 通过 ajax 提交
   *    (2) 如果校验失败, 会提示用户, 输入有误
   *
   *    需要注册表单校验成功事件, 在成功事件内, 阻止默认的表单提交, 通过 ajax 进行提交
   * */

  $("#form").on("success.form.bv",function(e){
    //阻止默认的表单提交
    e.preventDefault();
    console.log("阻止了默认的行为");

  //通过ajax提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      //表单序列话，快速收集表单提交的内容，进行提交
      data : $("#form").serialize(),
      dataType:"json",
      success:function(info){
       console.log(info);
        if(info.success){
          //  校验成功，跳转成功
          location.href = "index.html";
        }

        if(info.error == 1001){
        //  密码错误
          //alert( "密码错误" );
          // 将 password 的校验状态, 置成 校验失败状态, 并提示 密码错误
          // updateStatus的参数
          // 1. 字段名
          // 2. 校验状态, VALID 校验成功  INVALID 校验失败  NOT_VALIDATED 未校验
          // 3. 配置提示信息, 需要传校验规则

          $("#form").data("bootstrapValidator").updateStatus('password',"INVALID","callback");

        }

        if(info.error == 1000){
        //  用户名不存在
        //  alert('用户名不存在');
        //  这样用户体验不太好，要用
          $("#form").data("bootstrapValidator").updateStatus('username',"INVALID","callback")

        }

      },
      error:function(){

      }


    })
  });

//  3 、点击重置按钮的时候，把校验状态和input框中的内容重置为默认状态
  $('[type="reset"]').on("click",function(){
    // 调用插件提供的方法, 进行重置校验状态
    // resetForm 不传 true, 只重置校验状态, 传true还会将表单内容重置
    $("#form").data("bootstrapValidator").resetForm();
  })
})