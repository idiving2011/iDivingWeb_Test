/// <reference path=../jquery.js/>

(function ($) {
    $.extend({
        Call: function (settings) {

            var _defaultSettings = {
                trigger: $("<input/>", { type: "button" }),
                method: "POST",
                url: "",
                data: {},
                mime: "json",
                beforeCall: function () { return true; },
                afterCall: function (response) { },
                oops: function (messages) { },
                freeze: function () { },
                clear: function () { }
            };

            var _settings = $.extend(_defaultSettings, settings);
            if ("" == _settings.url && $(_settings.trigger).is("[data-call-url]"))
                _settings.url = $(_settings.trigger).attr("data-call-url");

            $.ajax({
                type: _settings.method,
                url: _settings.url,
                data: _settings.data,
                dataType: _settings.mime,
                beforeSend: function () {
                    //avoid double click
                    if ($(_settings.trigger).is("[Calling]"))
                        return false;

                    //try to do before call
                    if (!_settings.beforeCall())
                        return false;

                    _settings.freeze();
                    $(_settings.trigger).attr("Calling", "");
                },
                success: function (response) {
                    if (!response.HELP) {
                        _settings.oops({ "Message": [{ "@type": "Error", "@code": "999", "#text": "網頁伺服器發生錯誤，請稍候再試，謝謝！" }] });
                    } else if(response.HELP.Messages && response.HELP.Messages.Message.length > 0) {
                        _settings.oops(response.HELP.Messages.Message);
                    } else if (response.HELP.Messages && response.HELP.Messages.Message) {
                        _settings.oops([response.HELP.Messages.Message]);
                    } else {
                        _settings.afterCall(response.HELP.Data);
                    }
                },
                error: function () {
                    _settings.oops({ "Message": [{ "@type": "Error", "@code": "999", "#text": "網頁伺服器目前忙碌中，請稍候再試，謝謝！" }] });
                },
                complete: function () {
                    $(_settings.trigger).removeAttr("Calling");
                }
            });
        }
    });
})(jQuery);