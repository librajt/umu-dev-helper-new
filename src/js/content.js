function setShortKey() {
    Mousetrap.bind(['shift+t'], function (e) {
        goLang(1);
        return false;
    });
    Mousetrap.bind(['shift+c'], function (e) {
        goLang(2);
        return false;
    });
    Mousetrap.bind(['shift+e'], function (e) {
        goLang(3);
        return false;
    });
    Mousetrap.bind(['shift+j'], function (e) {
        goLang(4);
        return false;
    });
}

/// 生成html
function builderHtml() {
    var tpl = __inline('template.html');
    $('body').append(tpl);
}


$('document').ready(function () {
    builderHtml();

    languageHelper1();

    var currentlang = getCookie('_SYSTEM');
    enableTranslate = true;

    setShortKey();

    $('body').on('mouseover', function (e) {

        e.stopPropagation();
        // console.log(e);

        if (enableTranslate && currentlang == 'JP') {
            var elm = e.target;
            translateJp(elm);
        }

    });


    if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
        // 浏览器支持onhashchange事件

        window.onhashchange = function () {
            setTimeout(function () {
                testCaseMain();
            }, 2000);

        }
    }


    //
    $('.chrome-ext-umu-auto-fill').click(function () {
        selectQuestionType();
        fillTextarea();
    });


});
