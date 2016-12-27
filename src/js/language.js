/*
 * 语言切换和线上产品切换
 * */

var systemMap = {
    '1': 'TW',
    '2': 'CN',
    '3': 'EN',
    '4': 'JP'
};
var langMap = {
    '1': 'zh-tw',
    '2': 'zh-cn',
    '3': 'en-us',
    '4': 'ja-jp'
};

var siteMap = {
    1: "http://www.umu.tw/",
    2: "https://www.umu.cn/",
    3: "http://www.umu.com/",
    4: "http://www.umu.co/"
};

var domainMap = {
    'pc-yx': 'yx',
    'pc-zjx': 'zjx',
    'pc-zxj': 'zxj',
    'pc-zz': 'zz',
    'm-yx': 'm.yx',
    'm-zjx': 'm.zjx',
    'm-zxj': 'm.zxj',
    'm-zz': 'm.zz'

};


// 是否是开发环境
function isDevEnv() {
    var href = window.location.href;
    var reg = /umucdn\.cn/ig;
    return reg.test(href);
}

var storage_key_chrome_ext_umu_show_status = 'storage_key_chrome_ext_umu_show_status';
var storage_val_chrome_ext_umu_show_status = localStorage.getItem(storage_key_chrome_ext_umu_show_status);


function panelStatus() {
    if (storage_val_chrome_ext_umu_show_status == 1) {
        $('.chrome-ext-umu').addClass('chrome-ext-umu-hide');
        $('.chrome-ext-umu-btn-close').removeClass('is-active');
        enableTranslate = false;
    }
}

function getCookie(name) {
    var arr = '';
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    var date = new Date(0).toUTCString();
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + date + ';path=/;'
    }

    window.location.reload();
}
function setCookie(system, lang) {
    var domain = window.location.host.replace(/^test\./i, '');
    document.cookie = "_SYSTEM=" + system + ";path=/;domain=" + domain;
    document.cookie = "_lang=" + lang + ";path=/;domain=" + domain;
}

function goLang(index) {
    if (isDevEnv()) {
        setCookie(systemMap[index], langMap[index]);
        location.reload();
    } else {
        // 线上
        location.href = siteMap[index];
    }

}


function languageHelper1() {
    var currentlang = getCookie('_SYSTEM');
    var btns = $('.chrome-ext-umu-lang');

    btns.each(function (index, obj) {
        var $btn = $(obj);
        var index = $btn.attr('data-index');
        if (systemMap[index] == currentlang) {
            $btn.addClass('chrome-ext-umu-btn-active');
        }
    });

    btns.on('click', function (e) {
        var $btn = $(this);
        var index = $btn.attr('data-index');
        // 开发环境
        if (isDevEnv()) {
            setCookie(systemMap[index], langMap[index]);
            var href = window.location.href;
            if (href.indexOf('enterprise') > -1 && (href.indexOf('zh-cn') > -1
                || href.indexOf('en-us') > -1
                || href.indexOf('ja-jp') > -1
                || href.indexOf('zh-tw') > -1 )) {

                href = href.replace(/(zh-cn)|(zh-tw)|(ja-jp)|(en-us)/, function () {
                    return langMap[index];
                });

                window.location.href = href;
            }
            else {
                location.reload();
            }
        } else {
            // 线上
            location.href = siteMap[index];
        }

    });

    var $closeBtn = $('.chrome-ext-umu-btn-close');

    $closeBtn.on('click', function (e) {
        //body.removeChild(panel);
        $('.chrome-ext-umu').toggleClass('chrome-ext-umu-hide');
        if ($('.chrome-ext-umu.chrome-ext-umu-hide').length == 1) {
            localStorage.setItem(storage_key_chrome_ext_umu_show_status, 1);
            $closeBtn.removeClass('is-active');
            // $closeBtn.html('&gt;');
        } else {
            localStorage.setItem(storage_key_chrome_ext_umu_show_status, 0);
            // $closeBtn.html('&lt;');
            $closeBtn.addClass('is-active');
        }
        enableTranslate = !enableTranslate;

    });


    var $domainBtn = $('.chrome-ext-umu-domain-btn');
    $domainBtn.on('click', function () {
        var $btn = $(this);
        var domain = $btn.attr('data-domain');
        var host = domainMap[domain];
        var href = window.location.href;

        if (href.indexOf('.m.') >= 0 && host.indexOf('m') < 0) {
            // window.location.href = '';
        }

        var newhref = href.replace(/(yx|zxj|zjx|zz|m.yx|m.zxj|m.zjx|m.zz)/, function ($1, $2) {
            return host;
        });

        window.location.href = newhref;


    });


}







