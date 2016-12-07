/**
 * 小流量测试开关
 * liudaoyu on 2016/12/7.
 */

function smallFlowTestSwitch() {
    var $switch = $('.chrome-ext-umu-lang-samll-flow-switch');
    var $title = $('.chrome-ext-umu-lang-samll-flow-switch-title');

    /**
     * 打开小流量
     * */
    var open = function () {
        document.cookie = "UMUER=IN;path=/";
    };

    /**
     * 关闭小流量
     * */
    var close = function () {
        var domain = location.host.replace(/^\w+/, '');
        document.cookie = 'UMUER=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };


    function parse(str) {
        var obj = {};
        var pairs = str.split(/ *; */);
        var pair;
        if ('' == pairs[0]) return obj;
        for (var i = 0; i < pairs.length; ++i) {
            pair = pairs[i].split('=');
            obj[decode(pair[0])] = decode(pair[1]);
        }
        return obj;
    }

    function decode(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {
            debug('error `decode(%o)` - %o', value, e)
        }
    }


    function init() {
        var str = document.cookie;
        var cookies = parse(str);
        isOpenSwitch = cookies['UMUER'];
        if (isOpenSwitch == 'IN') {
            $switch.prop({checked:true});
        }
    }

    function bindEvents() {
        $switch.on('click', function (e) {
            var isOpen = $switch.is(':checked');
            console.log(isOpen);
            if (isOpen) {
                open();
            } else {
                close();
            }
        });
    }

    init();
    bindEvents();
}