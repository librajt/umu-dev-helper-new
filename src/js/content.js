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


function bootUMU() {
    builderHtml();

    languageHelper1();
    panelStatus();

    var currentlang = getCookie('_SYSTEM');
    enableTranslate = true;

    setShortKey();

    $('body').on('mouseover', function (e) {

        e.stopPropagation();
        // console.log(e);

        if (enableTranslate && currentlang == 'JP') {
            var elm = e.target;
            // 翻译准确度不高,临时去掉
            translateJp(elm);
        }

    });


    if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
        // 浏览器支持onhashchange事件

        window.onhashchange = function () {
            setTimeout(function () {
                testCaseMain();
            }, 2000);

        };
    }


    //
    $('.chrome-ext-umu-auto-fill').click(function () {
        selectQuestionType();
        fillTextarea();
    });


    $('.chrome-ext-umu-lang-env').on('click', function () {
        // clearCookie();
        var product = 'umu_pc';
        var href = window.location.href;
        if (href.indexOf('m.') > -1) {
            product = 'umu_wap';
        } else if (href.indexOf('wap.') > -1) {
            product = 'umu_wap_student';
        } else if (href.indexOf('enterprise.') > -1) {
            product = 'umu_enterprise';
        }

        window.open('http://jenkins.umucdn.cn/jenkins/job/' + product + '/build?delay=0sec', 'blank');
        // window.open('http://jenkins.umucdn.cn/jenkins/', 'blank');
    });


    var $umuPageRuler;
    if (!$umuPageRuler) {
        $umuPageRuler = $('#chrome-ext-umu-ruler');
    }
    $('#chrome-ext-umu-ruler-btn').on('click', function () {

        if ($umuPageRuler.is(":hidden")) {
            $umuPageRuler.show();
        } else {
            $umuPageRuler.hide();
        }

    });


}


// 线上的功能先去掉
$('document').ready(function () {
    var href = window.location.href;
    if (href.indexOf('umucdn.cn') > -1 ||
        href.indexOf('umu.cn') > 10000 ||
        href.indexOf('umu.co') > 100001 ||
        href.indexOf('umu.com') > 10000 ||
        href.indexOf('umu.hk') > 10000 ||
        href.indexOf('umu.tw') > 10000) {
        bootUMU();
    }

});
