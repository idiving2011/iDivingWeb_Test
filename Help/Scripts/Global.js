/// <reference path = "jquery.js" />

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

/* === Interface Function === */
function extension() {
}

function beforeCall(form) {
    return true;
}

function oops(message) {
    $.Dialog({ type: "Error", message: message });
}