/// <reference path=..\jquery.js/>

(function ($) {
    $.fn.extend({
        menu: function (data, settings) {

            function update(data) {
                $(box).empty();
                var groups = $(data).find("Group[prop!=Hide]");
                var percent = 1/$(groups).length*100;
                $(groups).each(function () {
                    group(box, $(this), percent.toString() + "%");
                });
            }

            function group(host, data, percent) {
                var block = $("<div/>", {
                    "class": "Group",
                    "width": percent
                }).append($("<div/>", {
                    "class": "Name",
                    "text": $(data).attr("text")
                }));

                if ($(data).attr("prop"))
                    $(block).addClass($(data).attr("prop"));

                var list = $("<div/>", {
                    "class": "List"
                });
                $(data).find("Item").each(function () {
                    item(list, $(this));
                });
                $(block).append(list);
                $(host).append(block);
            }

            function item(host, data) {
                var block = $("<a/>", {
                    "text": $(data).attr("text"),
                    "href": _settings.basePath + "Page/" + $(data).attr("href") + ".php"
                });
                if (/^http/.test($(data).attr("href"))) {
                    $(block).attr("href", $(data).attr("href"));
                    $(block).attr("target", "_blank");
                }
                $(host).append(block);
            }

            function tag(host, data) {
                var block = $("<div/>", {
                    "class": "Tag",
                    "text": $(data).attr("text")
                }).mouseenter(function () {
                    $(this).parent().find(".Hover").removeClass("Hover");
                    $(this).addClass("Hover");
                    update(data);
                    $(box).show();
                });
                if ($(data).attr("prop"))
                    $(block).addClass($(data).attr("prop"));
                $(host).append(block);
            }
            
            var _defaultSettings = {
                basePath: "../"
            }
            var _settings = $.extend(_defaultSettings, settings);

            var menu = $(this);
            var region = $("<div/>", {"class": "Region"});
            var box = $("<div/>", {"class": "Box"});
            
            $(data).find("Menu").each(function () {
                tag(region, $(this));
            });

            $(region).append(box);
            $(menu)
                .mouseleave(function () {
                        $(this).find(".Hover").removeClass("Hover");
                        $(box).hide();
                })
                .append(region);
        }
    });
})(jQuery);