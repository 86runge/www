$(document).ready(function() {

    if (!window.localStorage) {
        alert("浏览器支持localstorage");
        return false;
    } else {
        //主逻辑业务
        var storage = window.localStorage;
        var target_e = storage.getItem("target");
        var target_arr = target_e.split(',');
        for (let i = 0, len = target_arr.length; i < len; i++) {
            $("." + target_arr[i]).show();
        }

        var nav = storage.getItem("nav");
        var nav_style = storage.getItem("nav_style");
        var search_style = storage.getItem("search_style");
        var text = storage.getItem("text");
        fn($(nav));
    }

    function style_choose(item) {
        if (item) {
            var item_s = item.slice(-3);
            var item = item.slice(0, -3);
        }
        if (item + "_style") {
            if (item == 'nav') {
                storage.setItem(item + "_style", nav_style);
                $(".content-nav ul.nav").attr('data-style', nav_style);

            } else if (item == "search") {
                storage.setItem(item + "_style", search_style);
                $(".search-box").attr('data-style', search_style);
            }
            var item_st = $(".content-" + item + " .style_btn");
            switch (item + item_s) {
                case item + '-s0':
                    item_st.html("默认样式&nbsp;<span class='caret'></span>");
                    break;
                case item + '-s1':
                    item_st.html("样式一&nbsp;<span class='caret'></span>");
                    break;
                case item + '-s2':
                    item_st.html("样式二&nbsp;<span class='caret'></span>");
                    break;
                case item + '-s3':
                    item_st.html("样式三&nbsp;<span class='caret'></span>");
                    break;
                default:
                    item_st.html("默认样式&nbsp;<span class='caret'></span>");
            }
        }
    }

    function fn(data) {
        var editor_code = '';
        if (data.length) {
            for (let i = 0, len = data.length; i < len; i++) {
                if (i == 0) {
                    editor_code += "<li class='active'><a href='#'>" + $(data[i]).text() + "</a></li>";
                } else {
                    editor_code += "<li><a href='#'>" + $(data[i]).text() + "</a></li>";
                }
            }
        }
        storage.nav = editor_code;
        $(".content-nav ul.nav").html(editor_code);
        style_choose(nav_style);
        style_choose(search_style);
        $(".text-box").html(text);
    }

    var editor = CKEDITOR.replace("text_code");

    $(".demo").sortable({
        revert: true,
        handle: ".drag-btn"
    });

    $(".demo, .content-box").disableSelection();

    $('#carousel_box').carousel({
        interval: 4000
    })

    $(".content-nav ul.nav li").on('click', function(event) {
        event.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(document).on('click', ".nav-edit", function(event) {
        console.log($(this).find(".back"));
        event.preventDefault();
        let html_dom = $(".content-nav").find(".drag-code");
        let at_arr = html_dom.find("a");
        let editor_code = '';
        if (at_arr.length) {
            for (let i = 0, len = at_arr.length; i < len; i++) {
                editor_code += "<li>" + $(at_arr[i]).text() + "</li>";
            }
        }
        editor.setData(editor_code);
        $(".modal").modal('show');
        $("#save_code").addClass("save-nav");
    });

    $(".text-edit").on('click', function(event) {
        event.preventDefault();
        let html_dom = $(this).parents(".drag-operate").siblings();
        let editor_code = html_dom.find(".text-box").html();
        editor.setData(editor_code);
        $(".modal").modal('show');
        $("#save_code").addClass("save-text");
    });

    $(document).on('click', ".save-nav", function(event) {
        event.preventDefault();
        let modify_code = editor.getData();
        let data = $(modify_code).find("li");
        fn(data);
        $(".modal").modal('hide');
    })

    $(document).on('click', ".save-text", function(event) {
        event.preventDefault();
        let modify_code = editor.getData();
        storage.setItem("text", modify_code);
        $(".text-box").html(modify_code);
        $(".modal").modal('hide');
    })

    $(document).on('click', ".choose-style a", function(event) {
        event.preventDefault();
        let target = $(event.target);
        let note = target.text();
        let style = target.attr('data-style');
        let style_btn = target.parents("ul").siblings();
        let drag_operate = target.parents(".drag-operate");
        let style_target = drag_operate.siblings().find('.style-target');
        style_btn.html(note + "&nbsp;<span class='caret'></span>");
        style_target.attr('data-style', style);
        let style_item = style.slice(0, -3);
        storage.setItem(style_item + "_style", style);
    })

    $(".add_widget").on('click', function(event) {
        event.preventDefault();
        let box = $(this).attr("data-content");
        $("." + box).show();
        target_arr.push(box);
        var obj_arr = target_arr.filter(function(element, index, self) {
            return self.indexOf(element) === index;
        });
        storage.setItem("target", obj_arr);
    })

    $(".drag-delete").on('click', function(event) {
        event.preventDefault();
        let con_box = $(this).parents(".content-box");
        let tar_cl = con_box.attr("class").split(' ')[1];
        removeArr(tar_cl, target_arr);
        storage.setItem("target", target_arr);
        console.log(target_arr);
        con_box.hide();
    });

    function removeArr(val, arr) {
        var index = indexOf(val, arr);
        if (index > -1) { arr.splice(index, 1); }
    }

    function indexOf(val, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == val) { return i; }
        }
        return -1;
    }

    $(".btn-edit").on('click', function() {
        $(this).parents('.drag-operate').siblings().find('a').attr({
            'contenteditable': true,
            'class': 'editable-border'
        });
    })

    $(".btn-save").on('click', function() {
        $(this).parents('.drag-operate').siblings().find('a').attr({
            'contenteditable': false
        }).removeClass('editable-border');
    })

    $("#edit_layout").on('click', function() {
        $(".sidebar-nav").css({ "left": "0" });
        $("body").css({ "margin-left": "200px" });
        $(".drag-operate").show();
    })

    $("#view_layout").on('click', function() {
        $(".sidebar-nav").css({ "left": "-200px" });
        $("body").css({ "margin-left": "0" });
        $(".drag-operate").hide();
    })

    $("#save_layout").on('click', function(event) {
        event.preventDefault();
        //     $.ajax({
        //             url: '/server/save_layout.php',
        //             type: 'POST',
        //             dataType: 'json',
        //             data: { layout: layout },
        //         })
        //         .done(function() {
        //             console.log('success');
        //         })
        //         .fail(function() {
        //             console.log('error');
        //         })
    })

})