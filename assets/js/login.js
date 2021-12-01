$(function () {
    //点击“去注册账号”的链接
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    //点击“去登录”的链接
    $("#link_login").on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //从layui中获取form对象
    var form = layui.form

    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须包含6到12位, 且不能出现空格'],
        //检验两次密码是否相同
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            //进行判断，确认输入的两次值是否一致
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        //发起ajax的post请求
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功")
                //模拟人的点击行为
                $('#link_login').click()
            })
    })

    //监停登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功！")
                //将登录成功得到的token字符串，保持到localStorage中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})