/// <reference path=..\jquery.js/>
/// <reference path=jquery.News.js/>

(function ($) {
    $.fn.extend({
        fill: function (data, settings) {

            function _caption(host, data) {
                if ($(data).is("[caption]")) {
                    $(host).append($("<div/>", { "class": "Caption", text: $(data).attr("caption") }));
                }
            }

            function _tag(host, data) {
                if ($(data).is("[tag]")) {
                    $(host).attr("tag", $(data).attr("tag"));
                }
            }

            function _navigation(host, data) {
                $(host).append(_link($(data).attr("href"), "All", "全部"));
                $(host).append(_link($(data).attr("back"), "Back", "返回"));
            }

            function _link(link, type, text) {
                if (link != null)
                    return $("<div/>", { "class": type }).append($("<a/>", { href: link, "class": "Button Blue" }).text(text));
                else
                    return null;
            }

            function all(host, data) {
                var link = $(data).attr("href");
                if (link != null) {
                    $(host).append(
                        $("<div/>", { "class": "All" }).append(
                            $("<a/>", { href: link, "class": "Button Blue" }).text("全部")
                        )
                    );
                }
            }

            function back(host, data) {
                var link = $(data).attr("back");
                if (link != null) {
                    $(host).append(
                        $("<div/>", { "class": "Back" }).append(
                            $("<a/>", { href: link, "class": "Button Blue" }).text("返回")
                        )
                    );
                }
            }

            function title(host, data) {
                $(host).text($(data).attr("text"));
                $("head title").text(_settings.baseTitle + $(data).attr("text"));
            }

            function nav(host, data) {
                var sight = $(host).find(".Sight");
                $(data).find("Item").each(function () {
                    $(sight).append($($(this).attr("href") == "." ? "<span/>" : "<a/>", { "class": "Nav", href: $(this).attr("href"), text: $(this).attr("name") }));
                });
            }

            function dock(host, data) {
                var bar = $("<div/>", { "class": "Dock" });
                $(data).find("Item").each(function () {
                    $(bar).append($($(this).attr("href") == "." ? "<span/>" : "<a/>", { "class": "Nav", href: $(this).attr("href"), text: $(this).attr("name") }));
                });
                $(host).append(bar);
            }

            function html(host, data) {
                $(host).append($("<div/>", { "class": "Content" }).html($(data).text()));
            }

            function wove(host, data) {
                var table = $("<table/>", { "class": "Wove" });
                $(data).find("Item").each(function () {
                    var url = _settings.basePath + "Page/" + $(this).attr("href") + ".php"
                    if ($(this).attr("tab") != undefined) {
                        url = url + "?tab=" + $(this).attr("tab")
                    }
                    $("<tr/>", { href: url})
                        .append($("<td/>", { "class": "Bullet" }).append($("<img/>", { src: _settings.basePath + "Image/Basis/Bullet.png" })))
                        .append($("<td/>", { "class": "Name", text: $(this).attr("name") }))
                        .append($("<td/>", { "class": "Date", text: $(this).attr("date") }))
                        .append($("<td/>", { "class": "Status " + $(this).attr("type"), text: $(this).attr("text") }))
                        .appendTo(table)
                        .click(function () {
                            if ($(this).is("[href]"))
                                location.href = $(this).attr("href");
                        })
                });
                $(host).append($("<div/>", { "class": "Content" }).append(table));
            }

            function tab(host, data) {
                var tab = $("<div/>", { "class": "Tab", "data-Selected": $(data).attr("selected") });
                $(host).append($("<a/>", { id: "tab" })).append($("<div/>", { text: $(data).attr("description") })).append(tab);
                $(data).children("Item").each(function () {
                    $("<div/>", { text: $(this).attr("name"), "class": "Tag" })
                        .click(function () {
                            if ($(this).hasClass("Selected"))
                                return;
                            $(this).siblings().removeClass("Selected");
                            $("div[tag]").hide();

                            $(this).addClass("Selected");
                            $("div[tag='" + $(this).text() + "']")
                                .show(function () {
                                    $("div[tag*='" + $(this).find(".Selected").text() + "']").show();
                                });
                        })
                        .appendTo(tab);
                    _tabL2(host, $(this), tab);
                });
            }

            function _tabL2(host, data, tab) {
                var items = $(data).children("Item");
                if ($(items).length == 0)
                    return;
                var L2 = $("<div/>", { "class": "TabL2", "tag": $(data).attr("name") });
                $(items).each(function () {
                    $("<div/>", { text: $(this).attr("name"), "class": "Tag" })
                        .click(function () {
                            if ($(this).hasClass("Selected"))
                                return;
                            $(this).siblings().removeClass("Selected");
                            $("div[tag]:not(.TabL2)").hide();
                            $(this).addClass("Selected");
                            $("div[tag*='" + $(this).text() + "']").show();
                        })
                    .appendTo(L2);
                });
                $(L2).children(".Tag:first").addClass("Selected");
                $(tab).find(".Tag").addClass("L2");
                $(host).append(L2);
            }

            function card(host, data) {
                $(data).find("Item").each(function () {
                    var Specialty = $("<div/>", { "class": "Specialty" });
                    $(this).find("Specialty").each(function () {
                        $("<div/>", { text: $(this).text() }).appendTo(Specialty);
                    });

                    var card = $("<div/>", { "class": "Card" })
                        .append($("<img/>", { "class": "Photo", src: $(this).attr("src") }))
                        .append($("<div/>", { "class": "Title", text: $(this).find("Title").text() }))
                        .append($("<div/>", { "class": "Name", text: $(this).find("Name").text() }))
                        .append($("<div/>", { "class": "Message", html: $(this).find("Message").text() }))
                        .append(Specialty);

                    if ($(this).is("[href]") && $(this).attr("href") != "")
                        $("<a/>", { href: $(this).attr("href"), target: "_blank" }).append(card.addClass("Link")).appendTo(host);
                    else
                        card.appendTo(host);
                });
            }

            function scroll(host, data) {
                var arror = 24;
                var content = $("<div/>", { "class": "Content" });
                var bar = $("<div/>", { "class": "Scroll", "left": arror }).appendTo(content);
                $(data).find("Item").each(function () {
                    $(bar).append(_view($(this)));
                });

                $(content)
                .append(
                    $("<div/>", { "class": "Arrow Left Stop" }).click(function () {
                        if ($(this).hasClass("Stop")) return this;
                        var viewSize = $(this).parent().width() - $(this).width() * 2;
                        var size = $(bar).find("a").width();
                        var left = parseInt($(bar).attr("left")) + Math.floor(viewSize / size) * size;
                        var limit = arror;
                        if (left >= limit) {
                            left = limit;
                            $(this).addClass("Stop");
                        }
                        $(bar).attr("left", left).animate({ left: left }, 500);
                        $(this).siblings(".Stop").removeClass("Stop");
                    })
                ).append(
                    $("<div/>", { "class": "Arrow Right" }).click(function () {
                        if ($(this).hasClass("Stop")) return this;
                        var viewSize = $(this).parent().width() - $(this).width() * 2;
                        var size = $(bar).find("a").width();
                        var left = parseInt($(bar).attr("left")) - Math.floor(viewSize / size) * size;
                        var limit = viewSize + arror - $(bar).width();
                        if (left <= limit) {
                            left = limit;
                            $(this).addClass("Stop");
                        }
                        $(bar).attr("left", left).animate({ left: left }, 500);
                        $(this).siblings(".Stop").removeClass("Stop");
                    })
                );
                $(host).append(content);
                $(content).height($(bar).height());
            }

            function screen(host, data) {
                $(data).find("Item").each(function () {
                    $(host).append($("<div/>", { "class": "Content" }).append(_view($(this))));
                });
            }

            function _view(item) {
                return $("<a/>", { href: $(item).attr("href"), target: "_blank" }).append(
                                $("<div/>", { "class": "Screen" }).append(
                                    $("<img/>", { src: _settings.basePath + "Image/Basis/Blank.png" }).css("background-image", "url(" + $(item).attr("src") + ")")).append(
                                    $("<div/>", { "class": "Glass" })).append(
                                    $("<div/>", { "class": "Title", text: $(item).attr("name") })).append(
                                    $("<div/>", { "class": "SubTitle", text: $(item).attr("description") })
                                )
                            );
            }

            function AD(host, data) {
                $(data).find("Item:lt(6)").each(function () {
                    $(host).append($("<img/>", {
                        "alt": $(this).attr("alt"),
                        "src": _settings.basePath + "Image/AD/" + $(this).attr("src")
                    }));
                });
            }

            function url(host, data) {
                $(data).find("Item").each(function () {
                    $(host).append($("<iframe/>", {
                        src: $(this).attr("href"),
                        frameborder: "0",
                        allowTransparency: "true"
                    }));
                });
            }

            var _defaultSettings = {
                baseTitle: "iDiving (愛潛水) 全方位潛水中心 - ",
                basePath: "../",
                callBack: null
            }
            var _settings = $.extend(_defaultSettings, settings);

            _caption($(this), data);
            _tag($(this), data);
            eval($(data).attr("method"))($(this), data);
            _navigation($(this), data);

            return this;
        }
    });
})(jQuery);