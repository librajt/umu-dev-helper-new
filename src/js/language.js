
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

var storage_key_chrome_ext_umu_show_status = 'storage_key_chrome_ext_umu_show_status';
var storage_val_chrome_ext_umu_show_status = localStorage.getItem(storage_key_chrome_ext_umu_show_status);


function panelStatus() {
    if (storage_val_chrome_ext_umu_show_status == 1) {
        $('.chrome-ext-umu').addClass('chrome-ext-umu-hide');
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


function setCookie(system, lang) {
    document.cookie = "_SYSTEM=" + system + ";path=/";
    document.cookie = "_lang=" + lang + ";path=/";
}

function goLang(index) {
    setCookie(systemMap[index], langMap[index]);
    location.reload();
}

function languageHelper1() {
    var currentlang = getCookie('_SYSTEM');
    var btns = $('.chrome-ext-umu-lang');

    btns.each(function (index,obj) {
        var $btn = $(obj);
        var index = $btn.attr('data-index');
        if (systemMap[index] == currentlang) {
            $btn.addClass('chrome-ext-umu-btn-active');
        }
    });
    
    btns.on('click',function (e) {
        var $btn = $(this);
        var index = $btn.attr('data-index');
        setCookie(systemMap[index], langMap[index]);
        var href = window.location.href;
        if (href.indexOf('enterprise') >- 1 && (href.indexOf('zh-cn') >- 1
            || href.indexOf('en-us') >- 1
            || href.indexOf('ja-jp') >- 1
            || href.indexOf('zh-tw') >- 1 )) {

            href = href.replace(/(zh-cn)|(zh-tw)|(ja-jp)|(en-us)/,function () {
                return langMap[index];
            });

            window.location.href = href;
        }
        else {
            location.reload();
        }
    });

    var $closeBtn = $('.chrome-ext-umu-btn-close');

    $closeBtn.on('click', function (e) {
        //body.removeChild(panel);
        $('.chrome-ext-umu').toggleClass('chrome-ext-umu-hide');
        if ($('.chrome-ext-umu.chrome-ext-umu-hide').length == 1) {
            localStorage.setItem(storage_key_chrome_ext_umu_show_status,1);
            $closeBtn.html('&gt;');
        } else  {
            localStorage.setItem(storage_key_chrome_ext_umu_show_status,0);
            $closeBtn.html('&lt;');
        }
        enableTranslate = !enableTranslate;

    });

}





