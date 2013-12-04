/// <reference path=..\jquery.js/>
/// <reference path=jquery.cycle.js/>

(function ($) {
    $.fn.extend({
        adFade: function (settings) {
            var _defaultSettings = {
                clicked: null,
                changed: null
            }
            var _settings = $.extend(_defaultSettings, settings);

            var index = $("<div id='adIndex'/>");
            $(this).wrapInner("<div id='adContent'/>");
            var container = $("#adContent").cycle({ fx: "fade", pause: true, pager: "#adIndex", slideExpr: "img", slideResize: 0, containerResize: 0});
            container.children("img").each(function (i) {
                $("<div/>")
                .addClass("ADIndex")
                .text(i + 1)
                .attr("title", $(this).attr("alt"))
                .click(function () {
                    $(container).cycle(i);
                })
                .appendTo(index)
            });

            $(this).append(index);
            return this;
        }
    });
})(jQuery)