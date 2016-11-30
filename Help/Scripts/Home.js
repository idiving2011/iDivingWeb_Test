/// <reference path = "Site.js" />

$(".Go").click(function () {
    window.location.href = $(this).attr("data-action");
});

$("#login input").focus(function () {
    $("#message").hide();
});

function login() {
    $.Call({
        trigger: $("#login"),
        url: $("#login").attr("data-call-url"),
        data: { account: $("#account").val(), password: $("#password").val() },
        beforeCall: function () {
            if ("" == $("#account").val() || "" == $("#password").val()) {
                oops("請填入正確的帳號與密碼。");
                return false;
            }
            return true;
        },
        afterCall: function (data) {
            //var activities = data.Activities.Activity;
            //logon(data.Name, activities);
            //$("#welcome .App").each(function () {
            //    if (activities.indexOf($(this).attr("data-code")) > -1)
            //        enable($(this).find(".Go"));
            //});
            //$.Comfirmed();
        },
        oops: function (messages) {
            //oops(JSLINQ(messages.Message).Where(function (s) { return s["@type"] == "Error" }).Select(function (s) { return s["#text"] }).First());
            $.Comfirmed();
        }
    });
}

function oops(message) {
    $("#message").text(message).show();
}