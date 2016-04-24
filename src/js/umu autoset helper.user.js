// ==UserScript==
// @name         umu autoset helper
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @grant        none
// ==/UserScript==



function deleteCookie () {
    var domain = location.host.replace(/^\w+/, '');
    document.cookie = 'umuU=; domain=' + domain + '; path=\ expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function load() {
    if (typeof groupTitle !== 'undefined') {
        autosetHelper();
        if ($('.infoType').hasClass('success')) {
            deleteCookie();
            location.reload();
        }
    }
}


function autosetHelper() {
    var style = [
        '<style>',
            '.autosetHelper{position:fixed;z-index:9;right:0;bottom:0;opacity:.5;background:#CCC;padding:5px;}',
            '.autosetHelper:hover{opacity:1;}',
            '.autosetHelper input[type="checkbox"]{-webkit-appearance:checkbox;}',
            '.autosetHelper input[type="radio"]{-webkit-appearance:radio;}',
            '.autosetHelper .range{padding:0;width:3em;}',
            '.autosetHelper .value{width:10em;}',
            '',
            '',
        '</style>'
    ].join('');
    var html = [
        '<div class="autosetHelper">',
            style,
            '<div class="dashboard">', 
                '<div class="item radio"><label>',
                    '<input type="checkbox" class="use" checked>单选',
                    '【选项<input type="number" class="range range_start" value="1">】',
                '</label></div>',
                '<div class="item checkbox"><label>',
                    '<input type="checkbox" class="use" checked>多选',
                    '【选项<input type="number" class="range range_start" value="1">',
                    '-',
                    '<input type="number" class="range range_end" value="99">】',
                '</label></div>',
                '<div class="item textarea"><label>',
                    '<input type="checkbox" class="use" checked>开放',
                    '【值QX.<input type="text" class="value" value="auto set content">】',
                '</label></div>',
                '<div class="item nick"><label>',
                    '<input type="checkbox" class="use" checked>昵称',
                    '【值<input type="text" class="value" value="auto set nick">】',
                '</label></div>',
            '</div>',
            '<div class="opt"><button class="set">设置</button><button class="set" data-auto="1">自动提交</button></div>',
        '</div>'
    ].join('');

    var $el = $(html);

    function set(e) {
        var auto = $(e.currentTarget).attr('data-auto');
        console.log(e);

        
        var useRadio = $el.find('.dashboard .radio .use').get(0).checked;
        var useCheckbox = $el.find('.dashboard .checkbox .use').get(0).checked;
        var useTextarea = $el.find('.dashboard .textarea .use').get(0).checked;
        var useNick = $el.find('.dashboard .nick .use').get(0).checked;
        var useSubmit = auto;

        var rangeRadio = $el.find('.dashboard .radio .range_start').val();
        var rangeCheckboxStart = $el.find('.dashboard .checkbox .range_start').val();
        var rangeCheckboxEnd = $el.find('.dashboard .checkbox .range_end').val();

        var valueTextarea = $el.find('.dashboard .textarea .value').val();
        var valueNick = $el.find('.dashboard .nick .value').val();

        var $questions = $('.question');

        $.each($questions, function(questionIndex, question) {

            var $radios = useRadio ? $(question).find('.questionOption[data-name=radio]') : [];
            var $checkboxes = useCheckbox ? $(question).find('.questionOption[data-name*=checkbox]') : [];
            var $textareas = useTextarea ? $(question).find('.questionContent textarea') : [];

            if ($radios.length) {
                $.each($radios.filter(function(radioIndex, radio) {
                    if (radioIndex + 1 == rangeRadio) {
                        return radio;
                    }
                }), function(radioIndex, radio) {
                    if ($(radio).hasClass('selected')) {
                        return;
                    }
                    radio.click();
                });
            }
            else if ($checkboxes.length) {
                $.each($checkboxes.filter(function(checkboxIndex, checkbox) {
                    if (checkboxIndex + 1 >= rangeCheckboxStart && checkboxIndex + 1 <= rangeCheckboxEnd) {
                        return checkbox;
                    }
                }), function(checkboxIndex, checkbox) {
                    if ($(checkbox).hasClass('selected')) {
                        return;
                    }
                    checkbox.click();
                });
            }
            else if ($textareas.length) {
                $textareas.val($(question).find('.title .num').text() + valueTextarea);
            }
        })

        var $nick = useNick ? $('.nicknameWrap .inputBox') : [];
        $nick.length && $nick.val('auto set nick');

        var $submit = useSubmit ? $('#submit, .operate .btn_submit') : [];
        $submit.length && $submit.get(0).click();
    }

    $el.on('click', '.set', set);

    $('body').append($el);
}

if (typeof $ !== 'undefined') {
    load();
}
else {
    var script = document.createElement('script');
    script.src = '//apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js';
    script.onload = load;
    document.body.appendChild(script);
}

