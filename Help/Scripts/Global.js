/// <reference path = "jquery.js" />

function logon(name, activities) {
    $(".Topbar .Auth").text(name).show();
    $(".Topbar .Logout").show();
    $(".Menu .App").each(function () {
        if (activities.indexOf($(this).attr("data-code")) > -1)
            enable($(this));
    });
}

function check(form) {
    var errorCounter = 0;
    $(form).find(".TextBox[data-xUI-noEmpty]:not([disabled]), .TextBox[data-xUI-rule]:not([disabled])").each(function () {

        var warning = $(this).attr("data-xUI-empty");
        var rule = ".";

        if ($(this).is("[data-xUI-rule]")) {
            rule = $(this).attr("data-xUI-rule");
            warning = $(this).attr("data-xUI-incorrect");
        }

        var regex = new RegExp(rule, "i");
        if (!$(this).hasClass("Warning") && (!regex.test($(this).val()) || $(this).hasClass("Hint"))) {
            $(this).addClass("Warning").after($("<div/>", { class: "Error" }).text(warning));
        }

        if ($(this).hasClass("Warning"))
            errorCounter++;
    });

    return 0 == errorCounter;
}

function remove(obj) {
    $.Comfirmed();
    $.Dialog({ type: "Complete", message: "已成功刪除。", afterClose: function () { location.href = $(obj).attr("data-next"); } });
    return;


    $.Call({
        url: $(obj).attr("data-action"),
        method: "GET",
        afterCall: function (data) {
            $.Comfirmed();
            $.Dialog({ type: "Complete", message: "已成功刪除。", afterClose: function () { location.href = $(obj).attr("data-next"); } });
        },
        oops: function (data) {
            $.Comfirmed();
            var message = JSLINQ(messages.Message).Where(function (s) { return s["@type"] == "Error" }).Select(function (s) { return s["#text"] }).First();
            $.Dialog({ type: "Error", message: "刪除失敗！(" + message + ")" });
        }
    });
}

function rec(value1, value2) {
    var message = "";
    if (value2) message = " : " + value2;
    console.log("[eShop] " + value1 + message);
}

/* === UI Control === */
function sheet(range) {
    $(range).find(".Field.Required").each(function () {
        $(this).before($("<label/>").text("*").addClass("Star"));
    });
}

function enable(obj) {
    $(obj).removeAttr("disabled").removeClass("Disabled");
}

function readonly(form) {
    $(form).addClass("Read").find("input").each(function () {
        $(this).attr("readonly", true);
    })
}

function modify(form) {
    $(form).removeClass("Read").find("input").each(function () {
        $(this).removeAttr("readonly");
    })
}

/* === Interface Function === */
function extension() {
}

function beforeCall() {
    return true;
}

function afterCall(response) {
    $.Dialog({ type: "Complete", message: "異動成功。" });
    readonly($("form"));
    $(".Do .Save").hide();
    $(".Do .Edit").show();
}

function oops(message) {
    $.Dialog({ type: "Error", message: message });
}