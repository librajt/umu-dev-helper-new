
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


function languageHelper() {
    var currentBtnStyle = "cursor: pointer; width: 80px;height: 30px;display: block;background: #cacaca;line-height: 30px;text-align: center;color: #333333;border-bottom:1px solid #aaaaaa";
    var btnStyle = "cursor: pointer; width: 80px;height: 30px;display: block;background: #aaa;line-height: 30px;text-align: center;color: #333333;border-bottom:1px solid #aaaaaa";

    var currentlang = getCookie('_SYSTEM');


    var html = '<div class="chrome-ext-umu" style="width:80px;height:100px;z-index:99999; position:fixed; bottom:50px; left:20px;">'
        + '<a class="chrome-ext-umu-lang-close" style="display: inline-block;position: relative;top: 0;left: 70px;cursor: pointer;">X</a>'
        + '<a class="chrome-ext-umu-lang" style="' + (currentlang === 'TW' ? currentBtnStyle : btnStyle) + '" data-index="1">台湾</a>'
        + '<a class="chrome-ext-umu-lang" style="' + (currentlang === 'CN' ? currentBtnStyle : btnStyle) + '" data-index="2">大陆</a>'
        + '<a class="chrome-ext-umu-lang" style="' + (currentlang === 'EN' ? currentBtnStyle : btnStyle) + '" data-index="3">国际</a>'
        + '<a class="chrome-ext-umu-lang" style="' + (currentlang === 'JP' ? currentBtnStyle : btnStyle) + '" data-index="4">日本语</a>'
        + '<a class="chrome-ext-umu-auto-fill" style="" >自动填充问题</a>'
        + '</div>';


    var panel = document.createElement("div");

    panel.innerHTML = html;
    var body = document.querySelector('body');
    body.appendChild(panel);
    var btns = document.querySelectorAll('.chrome-ext-umu-lang');

    for (var i = 0; i < btns.length; i++) {

        btns[i].addEventListener('click', function (e) {
            var target = e.target;
            var index = target.getAttribute('data-index');

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
    }

    var close = document.querySelector('.chrome-ext-umu-lang-close');
    close.addEventListener('click', function (e) {
        body.removeChild(panel);
        enableTranslate = false;

    });

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


    $('.chrome-ext-umu-btn-close').on('click', function (e) {
        //body.removeChild(panel);
        $('.chrome-ext-umu').toggleClass('chrome-ext-umu-hide');
        enableTranslate = !enableTranslate;

    });

}


