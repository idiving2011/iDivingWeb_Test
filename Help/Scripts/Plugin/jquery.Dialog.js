/// <reference path=../jquery.js/>

(function ($) {
    $.extend({
        Comfirmed: function () {
            $("body").css("overflow", "auto").append($(".Dialog .Content").attr("hidden", ""));
            $(".Freeze").removeClass("Freeze");
            $(".Shadow, .Dialog").remove();
        }
    });

    $.extend({
        Dialog: function (settings) {

            function clear() {
                $(body).css("overflow", "auto").append($(_settings.content).attr("hidden", ""));
                $(".Freeze").removeClass("Freeze");
                $(".Shadow, .Dialog").remove();
            }

            function close() {
                clear();
                if (_settings.afterClose) {
                    _settings.afterClose();
                }
            }

            function set() {
                var types = ["Error", "Complete", "Deny", "Login", "Confirm"];
                var captions = ["錯誤", "完成", "禁止", "登入", "確認"];
                var buttons = ["確定", "確定", "確定", "送出", "是,否"]

                var index = types.indexOf(_settings.type);
                if (index < 0) {
                    index = 0;
                    _settings.type = types[index];
                }

                if (!_settings.caption) {
                    _settings.caption = captions[index];
                }

                if (!_settings.icon) {
                    _settings.icon = "/Images/Dialog/" + _settings.type + ".png";
                }

                if (!_settings.content) {
                    _settings.content = $("<div />").append($("<span />").text(_settings.message));
                }

                if (!_settings.button) {
                    _settings.button = buttons[index];
                }
            }

            function draw() {
                $(body).css("overflow", "hidden");
                $(".Holo").addClass("Freeze");
                
                var shadow = $("<div/>").addClass("Shadow");
                if (_settings.easyClose) {
                    shadow.click(function () {
                        close();
                    });
                }

                var action = $("<div/>", { class: "Action" });

                $.each(_settings.button.split(","), function (index, value) {
                    value = $.trim(value);
                    var button = $("<input/>", { type: "button", value: value });
                    if (0 == index) {
                        button.click(function () {
                            if (_settings.action)
                                _settings.action(value);
                            if (_settings.closeAfterAction)
                                close();
                        });
                    } else {
                        button.addClass("Careless").click(function () {close();});
                    }
                    action.append(button);
                });

                var dialog =
                    $("<div/>", { class: "Dialog" }).append(
                        $("<div/>", { class: "Type " + _settings.type }).append(
                            $("<div/>", { class: "Caption" }).text(_settings.caption),
                            $("<img/>", { class: "Icon", alt: _settings.caption, src: _settings.icon })
                        ),
                        $(_settings.content).addClass("Content").removeAttr("hidden"),
                        action
                    );

                $(body).prepend(shadow).append(dialog);
            }
                                    
            var _defaultSettings = {
                type: "Error",
                caption: null,
                icon: null,
                message: "",
                content: null,
                button: null,
                action: null,
                afterClose: null,
                easyClose: true,
                closeAfterAction: true
            };

            var _settings = $.extend(_defaultSettings, settings);
            var body = $("body");

            clear();
            set();
            draw();
        }
    });
})(jQuery);