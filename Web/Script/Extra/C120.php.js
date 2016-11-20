/// <reference path="../jquery.js" />

/* === Override Loader.js === */
function afterData() {
    $(".Link[data-tab]").click(function () {
        $(".Tab .Tag:nth-of-type(" + $(this).attr("data-tab") + ")").click();
    });
}