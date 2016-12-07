/// <reference path = "Site.js" />

$.ajaxSetup({
    cache: true
});

$(document).ready(function () {
    loadResource();

    //Site Function
    Topbar();
    list();
    submit();

    // Draw UI
    readonly($("form[readonly]"));

    // Do Extension
    extension(); // hook to Global.js
});

// Load Resource File
function loadResource() {
    var resources = $("meta[name='resource']").attr("content");    
    if (null != resources) {
        $.each(resources.split(","), function (index, value) {
            value = value.trim();
            if (value.match(/^jquery/)) {
                $.getScript("/Scripts/Plugin/" + value.replace(/.js$/, ".min.js"));
            }
            else if (value.match(/.js$/)) {
                $.getScript("/Scripts/" + value.replace(/.js$/, ".min.js"));
            }
            else if (value.match(/.less$/)) {
                $("head link[type$='text/css']:last").after($("<link/>", { type: "text/css", rel: "stylesheet", href: "/Styles/" + value.replace(/.less$/, ".min.css") }));
            }
        });
    }
}

// Site Function
function Topbar() {
    $(window).scroll(function () {
        // Float TopBar
        if ($(window).scrollTop() > 0) {
            $(".Topbar").addClass("Float");
        }
        else
            $(".Topbar").removeClass("Float");
    });

    $(".Topbar .Logout").click(function () {
        location.href = "/CHT/Home/Logout";
    });

    $(".Ham, .Back").click(function () {
        $(".Menu").fadeToggle("fast");
        event.stopPropagation();
    });

    $(".Topbar, .Holo").click(function () {
        $(".Menu").hide();
    });
}

function list() {
    $(".List .Items .Item").click(function () {
        location.href = $(this).attr("data-view") + "?id=" + $(this).attr("data-id");
    });
}

function submit() {
    $("form").submit(function (event) {
        if (beforeCall($(this))) {
            event.returnValue = false;
            return false;
        }
        event.returnValue = true;
    });
}

function act() {
    //新增
    $(".Do .Add").click(function () {
        if ($(this).is("[data-action]") && "" != $(this).attr("data-action"))
            location.href = $(this).attr("data-action");
    });

    //編輯
    $(".Do .Edit").click(function () {
        modify($("form").removeAttr("readonly"));
        $(this).hide();
        $(".Do .Save").show();
    });

    //儲存
    $(".Do .Save").click(function () {
        $("form").submit();
    });

    //刪除
    $(".Do .Remove").click(function () {
        var obj = $(this);
        $.Dialog({ type: "Confirm", message: "確認刪除此筆紀錄？", closeAfterAction: false, action: function (value) { remove(obj); } });
    });
}