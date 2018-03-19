$(document).ready(function($) {
    "use strict";

    // 根据获取的数据渲染页面
    var make_layout = function(layout) {
        let layout_arr = layout.split('<br>' + ',' + '<br>');
        let tpl = $(".lay-content")[0];
        for (let i = 0, len = layout_arr.length; i < len; i++) {
            let html = $(tpl).clone().removeAttr('style');
            html.find('.lay-code').html(layout_arr[i]);
            $("#content").append(html);
        }
        return
    }

    let choose_code = function(part) {
        let part_code = part.parents('.lay-operate').siblings('.lay-code').children();
        return part_code;
    }

    if (!window.localStorage) {
        alert("浏览器支持localstorage");
        return false;
    } else {
        // 从localStorage里获取数据
        var storage = window.localStorage;
        let layout = storage.getItem("layout");
        if (layout) {
            // make_layout(layout);
        }
    }

    // 从数据库里读取数据
    let load_layout = function() {
        $.ajax({
                url: '/server/load_layout.php',
                type: 'GET',
            })
            .done(function(data) {
                if (data != 0) {
                    let obj = $.parseJSON(data).layout_str;
                    make_layout(obj);
                } else {
                    console.log("无数据")
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }
    load_layout();

    let save_layout = function() {
        let code = $('#content .lay-code');
        let lay_arr = [];
        for (let i = 0; i < code.length; i++) {
            lay_arr.push($(code[i]).html());
        }
        let lay_str = lay_arr.join('<br>' + ',' + '<br>')
        $.ajax({
                url: '/server/save_layout.php',
                type: 'POST',
                // dataType: 'json',
                data: {
                    layout: lay_str
                },
            })
            .done(function(data) {
                console.log(data);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }

    // 选择样式
    $(document).on('click', '.choose-style a', function(event) {
        event.preventDefault();
        let this_style = $(event.target).attr('data-style');
        let target = $(this).parents('.lay-operate').siblings('.lay-code').children();
        target.attr('data-style', this_style);
    })

    /*单个元素编辑*/

    // 悬停出编辑
    $("#content").on('mouseover', ".nav li:not(.li-add)", function(event) {
        let that = $(this);
        if (that.has('.edit-btn').length) {
            return false
        } else {
            if (that.find('a').hasClass('sort-disabled')) {
                that.append("<i class='edit-btn iconfont icon-baocun'></i><i class='delete-min iconfont icon-shanchu'></i>");
            } else {
                that.append("<i class='edit-btn iconfont icon-edit'></i><i class='delete-min iconfont icon-shanchu'></i>");
            }
        }
    });
    $("#content").on('mouseleave', ".nav li", function(event) {
        $(this).find('i').remove();
    });

    $("#content").on('click', '.icon-edit', function(event) {
        event.preventDefault();
        $(this).siblings('a').attr('contenteditable', true).addClass('sort-disabled');
        $(this).removeClass('icon-edit').addClass('icon-baocun');
    });

    // 添加元素 添加导航栏里面的元素
    $(document).on('click', '.add-lay-ele', function(event) {
        event.preventDefault();
        let nav = $(this).parents('.nav');
        console.log(nav);
        $(this).parents('li').before("<li role=presentation><a href=# class=sort-disabled contenteditable=true>请编辑</a></li>")
    })

    // 删除单个元素
    $(document).on('click', '.delete-min', function(event) {
        event.preventDefault();
        $(this).parents('li').remove();
    });

    // 单个元素编辑保存
    $("#content").on('click', '.icon-baocun', function(event) {
        event.preventDefault();
        let nav = $(this).parents('.nav');
        console.log(nav);
        nav.find('.add-lay-ele').remove();
        nav.find('a').attr('contenteditable', false).removeClass('sort-disabled');
        $(this).parents('li').find('i').remove();
        save_layout();
    });

    /*模块操作*/

    // 删除板块
    $(document).on('click', '.lay-delete', function(event) {
        event.preventDefault();
        let lay = choose_code($(this));
        lay.parents('.lay-content').remove();
    });

    // 添加板块
    $(".add-element").on('click', function(event) {
        event.preventDefault();
        let element = $(this).siblings().clone();
        $("#content").append(element.removeAttr('style'));
    })

    // 拖动
    $("#content").on('mouseover', ".nav a", function(event) {
        $(".nav").sortable({
            axis: "x",
            cancel: ".sort-disabled"
        });
    });
    $("#content").on('mouseover', ".lay-operate", function(event) {
        $("#content").sortable({
            axis: "y",
            handle: ".lay-btn"
        });
    });

    // 进入编辑模式
    $("#lay_edit").on('click', function(event) {
        event.preventDefault();
        $("#aside").show(0).css('margin-left', '0');
        $("#content").css('margin-left', '200px');
        $("#content .lay-operate").show(0);
        $("#section").addClass('pseudo');
        $(".li-add").show();
    })

    // 预览模式
    $("#lay_scan").on('click', function(event) {
        event.preventDefault();
        $("#aside").show(0).css('margin-left', '-200px');
        $("#content").css('margin-left', '0');
        $("#content .lay-operate").hide(0);
        $("#section").removeClass('pseudo');
        $(".li-add").hide();
    })

    // 保存代码
    $("#lay_save").on('click', function(event) {
        event.preventDefault();
        save_layout()
    })

    // 清空内容
    $("#lay_clear").on('click', function(event) {
        event.preventDefault();
        $("#content").children().remove();
    });
});