/// <reference path=../jquery.js/>

(function ($) {
    $.fn.extend({
        messageStick: function (settings) {
            var _defaultSettings = {
                imgPath: "../Image/Message/",
                closed: null
            }
            var _settings = $.extend(_defaultSettings, settings);

            $(this).each(function () {
                var type = $(this).attr("type") ? $(this).attr("type") : "Info";
                $(this).addClass(type)
                    .prepend(
                        $("<img/>").addClass("Icon").attr("src", _settings.imgPath + type + ".png")
                    );
                if ($(this).attr("closable") && type != "Click") {
                    $(this).addClass("WithClose").append(
                        $("<img/>", {
                            "class": "Close",
                            src: _settings.imgPath + "close.png",
                            mouseover: function() {
                                $(this).attr("src", _settings.imgPath + "closing.png");
                            },
                            mouseout: function() {
                                $(this).attr("src", _settings.imgPath + "close.png");
                            },
                            click: function() {
                                $(this).parent().hide();
                                if (_settings.closed) _settings.closed();
                            }
                        })
                    );
                }
            })
        }
    });

    $.fn.extend({
        messageTip: function (settings) {
            var _defaultSettings = {
                imgPath: "../Image/Message/",
                closed: null
            };
            var _settings = $.extend(_defaultSettings, settings);
            $(this).each(function () {
                var type = $(this).attr("type") ? $(this).attr("type") : "Grass";
                var left = $(this).attr("left") ? parseInt($(this).attr("left")) : 50;
                var direction = $(this).attr("direction") ? $(this).attr("direction") : "Up";

                var tip = $("<img/>").addClass("Tip").attr("src", _settings.imgPath + "Tip." + type + "." + direction + ".png").css("left", left);
                var box = $("<div/>").html($(this).html()).addClass("Box " + type);
                $(this).empty();
                if (direction == "Up")
                    $(this).append(tip.css("top", 1)).append(box);
                else
                    $(this).append(box).append(tip.css("top", -1));
                
                if ($(this).attr("closable")) {
                    box.addClass("WithClose").append(
                        $("<img/>", {
                            "class": "Close",
                            src: _settings.imgPath + "close.png",
                            mouseover: function() {
                                $(this).attr("src", _settings.imgPath + "closing.png");
                            },
                            mouseout: function() {
                                $(this).attr("src", _settings.imgPath + "close.png");
                            },
                            click: function() {
                                $(box).parent().hide();
                                if (_settings.closed) _settings.closed();
                            }
                        })
                    );
                }
            });
        }
    });

    $.fn.extend({
        messageHint: function (settings) {
            var _defaultSettings = {
                imgPath: "../Image/Message/",
            };
            var _settings = $.extend(_defaultSettings, settings);
            
            $(this).each(function() {
                //初始化
                if (!$(this).hasClass("Warning") && $(this).attr("note")) {
                    $(this).val("(" + $(this).attr("note") + ")").addClass("Note");
                }

                //行為切換
                $(this).focus(function () {
                    if ($(this).val() == "(" + $(this).attr("note") + ")" || $(this).val() == $(this).attr("noEmpty"))
                        $(this).val("");
                    $(this).removeClass("Note").removeClass("Warning");
                }).blur(function () {
                    if ($(this).val() == "" && $(this).attr("note"))
                        $(this).val("(" + $(this).attr("note") + ")").addClass("Note");
                });
            });
            
            //檢查錯誤    
            $("form").submit(function () {
                var errorCounter = 0;
                $(".MessageHint[noEmpty]:not([disabled]), .MessageHint[rule]:not([disabled])").each(function () {

                    var warning = $(this).attr("noEmpty");
                    var rule = ".";

                    if ($(this).attr("rule")) {
                        rule = $(this).attr("rule");
                        warning = "";
                    }

                    var regex = new RegExp(rule, "i");
                    if (!regex.test($(this).val()) || $(this).hasClass("Note") || $(this).hasClass("Warning")) {
                        if (warning != "")
                            $(this).val(warning);
                        else if ($(this).val() == "(" + $(this).attr("note") + ")")
                            $(this).val("");

                        $(this).removeClass("Note").addClass("Warning");
                        errorCounter++;
                    }
                });

                if (errorCounter > 0) {
                    try {
                        Sys.WebForms.PageRequestManager.getInstance().abortPostBack();
                    }
                    catch (ex) { }
                    return false;
                }
            });
        }
    });

})(jQuery);