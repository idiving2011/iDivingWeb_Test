/// <reference path=..\jquery.js/>
/// <reference path=jquery.News.js/>

(function ($) {
    $.fn.extend({
        fill: function (data, settings) {
            
            function _caption(host, data) {
                var caption = $(data).attr("caption");
                if (caption != null) {
                    $(host).append($("<div/>", { "class": "Caption", text: caption }));
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
                        $("<div/>", {"class": "All"}).append(
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
                    $(sight).append($($(this).attr("href") == "." ? "<span/>": "<a/>", { "class": "Nav", href: $(this).attr("href"), text: $(this).attr("name") }));
                });
            }

            function html(host, data) {
                $(host).append($("<div/>", { "class": "Content" }).html($(data).text()));
            }

            function wove(host, data) {
                var table = $("<table/>", { "class": "Wove" });
                $(data).find("Item").each(function () {
                    $("<tr/>", { href: $(this).attr("href") })
                        .append($("<td/>", { "class": "Bullet" }).append($("<img/>", { src: _settings.basePath + "Image/Basis/Bullet.png" })))
                        .append($("<td/>", { "class": "Name", text: $(this).attr("name") }))
                        .append($("<td/>", { "class": "Date", text: $(this).attr("date") }))
                        .append($("<td/>", { "class": "Status " + $(this).attr("type"), text: $(this).attr("text") }))
                        .appendTo(table)
                        .click(function () {
                            if($(this).is("[href]"))
                                location.href = $(this).attr("href");
                        })
                });
                $(host).append($("<div/>", { "class":"Content"}).append(table));
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
                var viewSize = $(host).width() - arror * 2;
                var bar = $("<div/>", { "class": "Scroll", "left": arror }).appendTo(content);
                $(data).find("Item").each(function () {
                    $(bar).append(_view($(this)));
                });

                $(content)
                .append(
                    $("<div/>", { "class": "Arrow Left Stop" }).click(function() {
                        if ($(this).hasClass("Stop")) return this;
                        var left = parseInt($(bar).attr("left")) + viewSize;
                        var limit = arror;
                        if (left >= limit) {
                            left = limit;
                            $(this).addClass("Stop");
                        }
                        $(bar).attr("left", left).animate({left: left }, 500);
                        $(this).siblings(".Stop").removeClass("Stop");
                    })
                ).append(
                    $("<div/>", { "class": "Arrow Right" }).click(function () {
                        if ($(this).hasClass("Stop")) return this;
                        var left = parseInt($(bar).attr("left")) - viewSize;
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
                    $(host).append($("<div/>", {"class":"Content"}).append(_view($(this))));
                });
            }

            function _view(item) {
                return $("<a/>", { href: $(item).attr("href"), target: "_blank" }).append(
                                $("<div/>", { "class": "Screen" }).append(
                                    $("<img/>", {src: _settings.basePath + "Image/Basis/Blank.png"}).css("background-image", "url(" + $(item).attr("src") + ")")).append(
                                    $("<div/>", { "class": "Glass" })).append(
                                    $("<div/>", { "class": "Title", text: $(item).attr("name") })).append(
                                    $("<div/>", { "class": "SubTitle", text: $(item).attr("date") })
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
                        frameborder : "0",
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
            eval($(data).attr("method"))($(this), data);
            _navigation($(this), data);

            return this;
        }
    });
})(jQuery);