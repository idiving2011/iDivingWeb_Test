/// <reference path = "jquery.js" />
/// <reference path = "Plugin\jquery.Menu.js" />
/// <reference path = "Plugin\jquery.Message.js" />
/// <reference path = "Plugin\jquery.Fill.js" />
/// <reference path = "Plugin\jquery.cookie.js" />
/// <reference path = "Plugin\jquery.url.js" />
/// <reference path = "Plugin\jquery.ga.js" />

var dev;
var basePath;

$(document).ready(function () {
    dev = top.location.toString().match(/\?(.+=.*&)*dev/)
    isIE = /msie/i.test(navigator.userAgent);

    basePath = $("meta[name='BasePath']").attr("content");
    if (!basePath) basePath = "../";

    //viewPort();
    resource();
    checkParent();
    trace();
    xUI();
    extension();
    data();

    $(window).one("load", function () {
        adjust();
    }).resize(function () {
        adjust();
    });

});

/* === Private Function === */
//Viewport
function viewPort() {
    $("title").after($("<meta/>", { name: "viewport", content: "width=device-width, initial-scale=1.0" }));
}


// Resource
function resource() {
    var basis = "jquery.ga.js;jquery.url.js; jquery.cookie.js; jquery.Message.js; jquery.Menu.js; xUI.Menu.less; xUI.Head.less; xUI.Foot.less; xUI.Message.less; Basis.less; jquery.Fill.js";
    var extra = $("meta[name='Extra']").attr("content");
    var pointer = $("script[src$='Loader.js']");

    if(!dev) less = { env: "production" }; // stop console log from less.js

    if (extra) addResource(pointer, extra, basePath, "Extra");
    addResource(pointer, basis, basePath, "Basis");
    if (dev) addResource($("head link:last"), "Dev.less", basePath, "Basis");
    addResource(pointer, "less.js", basePath, "Basis");
}

function addResource(pointer, source, basePath, folder) {
    $.each(source.split(";"), function (index, value) {
        value = $.trim(value);
        if (value.match(/^jquery/)) {
            pointer.after($("<script/>", { src: basePath + "Script/Plugin/" + value }));
        }
        else if (value.match(/.js$/)) {
            pointer.after($("<script/>", { src: basePath + "Script/" + folder + "/" + value }));
        }
        else if (value.match(/^xUI/)) {
            pointer.after($("<link/>", { rel: "stylesheet/less", href: basePath + "Style/Plugin/" + value }));
        }
        else if (value.match(/.less$/)) {
            pointer.after($("<link/>", { rel: "stylesheet/less", href: basePath + "Style/" + folder + "/" + value }));
        }
        else if (value.match(/.css$/)) {
            pointer.after($("<link/>", { rel: "stylesheet/css", href: basePath + "Style/" + folder + "/" + value }));
        }
    });
}

//Trace
function trace() {
    $.ga.load("UA-46520389-1");
}

//CheckParnet
function checkParent() {
    if (parent != self)
        top.location.replace(self.location.toString());
}

// xUI
function xUI() {
    menu();

    var range = $("body");
    message(range);
    link(range);
    hide(range);
    sight(range);

    font();
}

function menu() {
    var host = $("#menu");
    if (host) {
        var path = "Data/Menu.CH.xml";
        if ($(host).attr("data")) path = $(host).attr("data");
        $.ajax({ url: basePath + path, dataType: isIE ? "text" : "xml" }).always(function (data) { $(host).menu(data); });
    }
}

function message(range) {
    var tip = "GrayDark";
    var waring = "Warning";
    $(range).find("div.MessageStick").messageStick();
    $(range).find("div.MessageTip").messageTip();
    $(range).find("input.MessageHint").messageHint();
}

function link(range) {
    $(range).find("a[disabled]").each(function () {
        var label = $("<label/>", {
            "class": "Disabled",
            href: $(this).attr("href"),
            target: $(this).attr("target")
        })
        .addClass($(this).attr("class"))
        .html($(this).html());
        $(this).replaceWith(label);
    });
}

function hide(range) {
    $(range).find("[hide]").addClass("Hide");
}

function sight(range) {
    $(range).find("[sight]").wrapInner("<div class=\"Sight\" />");
}

function font() {
    if (!$.cookie("fontSize")) {
        $.cookie("fontSize", "Standard");
    } else if ($.cookie("fontSize") == "Large") {
        zoomFont(2);
        $("#largeFont").addClass("Disabled");
    } else {
        $("#standardFont").addClass("Disabled");
    }

    $("#largeFont").click(function () {
        if ($(this).hasClass("Diasbled"))
            return;
        $(this).addClass("Disabled");
        $.cookie("fontSize", "Large");
        zoomFont(2);
        $("#standardFont").removeClass("Disabled");
    });

    $("#standardFont").click(function () {
        if ($(this).hasClass("Diasbled"))
            return;
        $(this).addClass("Disabled");
        $.cookie("fontSize", "Standard");
        zoomFont(-2);
        $("#largeFont").removeClass("Disabled");
    });
}

function zoomFont(size) {
    $("#section *[class], section *[class]").each(function () {
        //alert($(this).attr("class") + $(this).css("font-size"));
        $(this).css("font-size", parseFloat($(this).css("font-size")) + size);
    });
}

//Data
function data() {
    var path = $("meta[name='Data']");
    if ($(path).length != 1) return;
    $.ajax({ url: basePath + $(path).first().attr("content"), dataType: isIE ? "text" : "xml"})
        .success(function (data) {
            data = isIE ? $.parseXML(data) : data;
            $(data).find("Block").each(function () {
                var host = $("#" + $(this).attr("id"));
                if ($(host).length > 0) {
                    $(host).fill($(this), { basePath: basePath });
                }
            });
        })
        .fail(function () {
            //錯誤控制？
        })
        .always(function () {
            Init();
            afterData();
        });
}

function Init() {
    //Tab Selected
    var name = $.url.param("tab");
    var tab = $(".Tag:contains('" + name + "')");

    if ("" == name || 0 == $(tab).length) {
		tab = $(".Tag:contains('" + $(".Tab").attr("data-selected") + "')");
    }

    var parentText = $(tab).parent().attr("tag");
    var parentTab = $(".Tag:contains('" + parentText + "')")

    // Have upper level tab
    if (parentText != undefined || $(parentTab).length == 1) {
        $(parentTab).click()
    }
    $(tab).click();
}

/* === Overridable Function === */
function extension() {
}

function afterData() {
}

function adjust() {
}

/* === Develoment Function === */
function rec(value1, value2) {
    if (!dev) return;
    var message = "";
    if (value2) message = " : " + value2;
    console.log("[iDiving] " + value1 + message);
}