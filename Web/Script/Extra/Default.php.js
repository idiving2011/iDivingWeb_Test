/// <reference path="../jquery.js" />
/// <reference path="../Plugin/jquery.AD.js" />

/* === Override Loader.js === */
function afterData() {
    $("#AD").adFade();
}

function extension() {
    googleSearch();
}

function adjust() {
    //facebook 的寬度
}

function googleSearch() {
    $("#search").click(function () {
        var keyword = "";
        if (!$("#keyword").hasClass("Note"))
            keyword = $("#keyword").val();
        window.open("https://www.google.com.tw/search?hl=zh-TW&q=site%3Aidiving.com.tw+" + keyword);
    });
    $("#keyword").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#search").click();
        }
    });
}